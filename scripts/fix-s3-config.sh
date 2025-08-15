#!/bin/bash

# Fix S3 configuration for your specific bucket
BUCKET_NAME="karnivalkings"
REGION="eu-north-1"

echo "Fixing S3 bucket configuration: $BUCKET_NAME"

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Create and apply bucket policy for public read access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

# Apply bucket policy
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Disable block public access (required for static website hosting)
aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Re-sync your files with correct content-type
echo "Re-uploading files with correct content-type..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --cache-control "public, max-age=31536000" --exclude "*.html" --exclude "*.json"
aws s3 sync dist/ s3://$BUCKET_NAME --delete --cache-control "no-cache" --include "*.html" --include "*.json" --content-type "text/html"

# Clean up
rm bucket-policy.json

echo "Configuration fixed! Your site should now work at:"
echo "http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com/"
