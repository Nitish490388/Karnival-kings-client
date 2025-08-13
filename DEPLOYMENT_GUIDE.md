# Deployment Guide

## Initial Setup

### 1. AWS Resources Setup
Run the setup script to create your S3 bucket and CloudFront distribution:
\`\`\`bash
chmod +x scripts/setup-aws-resources.sh
./scripts/setup-aws-resources.sh
\`\`\`

### 2. GitHub Secrets Configuration
Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `AWS_REGION`: Your AWS region (e.g., us-east-1)
- `S3_BUCKET_NAME`: Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID
- `VITE_API_URL`: Your API URL (if applicable)

### 3. IAM Policy for GitHub Actions
Create an IAM user with this policy:

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
\`\`\`

## How It Works

### Automated Pipeline
1. **Trigger**: Push to main/master branch
2. **Test**: Runs tests and linting
3. **Build**: Creates production build with environment variables
4. **Deploy**: Syncs files to S3 with proper cache headers
5. **Invalidate**: Clears CloudFront cache for immediate updates

### Cache Strategy
- Static assets (JS, CSS, images): 1 year cache
- HTML files: No cache (immediate updates)
- CloudFront invalidation ensures users get latest version

### Zero-Downtime Deployments
- S3 sync with `--delete` removes old files
- Atomic updates ensure no broken states
- CloudFront serves cached content during deployment

## Making Changes

### Development Workflow
1. Make your code changes
2. Test locally: `npm run dev`
3. Commit and push to main branch
4. GitHub Actions automatically deploys
5. Check deployment status in Actions tab

### Environment Variables
- Add new variables to GitHub Secrets
- Reference them in the workflow file
- Prefix with `VITE_` for client-side access

### Rollback Strategy
If something goes wrong:
1. Revert the commit in GitHub
2. Push the revert
3. Pipeline will automatically deploy the previous version

## Monitoring
- Check GitHub Actions for deployment status
- Monitor AWS CloudWatch for S3 and CloudFront metrics
- Set up AWS SNS notifications for deployment alerts
