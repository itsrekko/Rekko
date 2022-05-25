import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export const MongoURLSecretManagerPolicy = () : PolicyStatement => {
    const secretManagerPolicy: PolicyStatement = new PolicyStatement({
        actions: [
            "secretsmanager:GetSecretValue",
            "secretsmanager:DescribeSecret",
            "secretsmanager:ListSecretVersionIds",
            "secretsmanager:PutSecretValue",
            "secretsmanager:UpdateSecret",
            "secretsmanager:TagResource",
            "secretsmanager:UntagResource"
        ],
        resources: [
            "arn:aws:secretsmanager:us-west-2:032629023661:secret:mongoDBUrl-cfcOhq",
            "arn:aws:secretsmanager:us-west-2:032629023661:secret:mongoDBMohaimenSecret-lTg5Jy"
        ]
    });

    return secretManagerPolicy;
}