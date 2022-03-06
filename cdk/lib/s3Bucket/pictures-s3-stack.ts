import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { CdkStack } from "../cdk-stack";

export const PicturesS3Stack = (parent: CdkStack) => {
    return new Bucket(parent, 'RekkoImagesBucket');
}