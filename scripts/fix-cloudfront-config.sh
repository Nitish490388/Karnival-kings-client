#!/bin/bash

BUCKET_NAME="karnivalkings"
REGION="eu-north-1"

echo "Fixing CloudFront distribution for bucket: $BUCKET_NAME"

# Get the distribution ID
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Origins.Items[0].DomainName==\`$BUCKET_NAME.s3.amazonaws.com\`].Id" --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "No CloudFront distribution found. Creating new one..."
    
    # Create distribution config
    cat > distribution-config.json << EOF
{
    "CallerReference": "$(date +%s)",
    "Comment": "Distribution for $BUCKET_NAME",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "$BUCKET_NAME-origin",
                "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "$BUCKET_NAME-origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100"
}
EOF

    # Create distribution
    RESULT=$(aws cloudfront create-distribution --distribution-config file://distribution-config.json)
    DISTRIBUTION_ID=$(echo $RESULT | jq -r '.Distribution.Id')
    DOMAIN_NAME=$(echo $RESULT | jq -r '.Distribution.DomainName')
    
    echo "Created new CloudFront distribution: $DISTRIBUTION_ID"
    echo "Domain: https://$DOMAIN_NAME"
    
    # Clean up
    rm distribution-config.json
    
else
    echo "Found existing distribution: $DISTRIBUTION_ID"
    
    # Get current config
    aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > current-config.json
    
    # Extract ETag and config
    ETAG=$(jq -r '.ETag' current-config.json)
    
    # Update the origin to use website endpoint
    jq '.DistributionConfig.Origins.Items[0].DomainName = "'$BUCKET_NAME'.s3-website-'$REGION'.amazonaws.com" | 
       .DistributionConfig.Origins.Items[0].CustomOriginConfig = {
         "HTTPPort": 80,
         "HTTPSPort": 443,
         "OriginProtocolPolicy": "http-only"
       } | 
       del(.DistributionConfig.Origins.Items[0].S3OriginConfig)' current-config.json > updated-config.json
    
    # Update distribution
    aws cloudfront update-distribution --id $DISTRIBUTION_ID --distribution-config file://updated-config.json --if-match $ETAG
    
    echo "Updated CloudFront distribution: $DISTRIBUTION_ID"
    
    # Clean up
    rm current-config.json updated-config.json
fi

# Invalidate cache
echo "Creating invalidation..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "CloudFront configuration fixed!"
echo "Your site will be available at the CloudFront URL in a few minutes."
echo "Distribution ID: $DISTRIBUTION_ID"
