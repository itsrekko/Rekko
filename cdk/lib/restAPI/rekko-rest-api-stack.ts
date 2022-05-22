import { AuthorizationType, Cors, LambdaIntegration, Resource, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { CdkStack } from '../cdk-stack';
import { GetAllBrandsLambda } from '../lambdas/brandLambdas/getAllBrands';
import { IndexLambda } from '../lambdas/indexLambda/indexLambda';
import { HealthLambda } from '../lambdas/healthLambda/healthLambda';
import { GetAllReviewsLambda } from '../lambdas/reviewLambdas/getAllReviewsLambda';
import { GetReviewsLambda } from '../lambdas/reviewLambdas/getReviewsLambda';
import { SearchThroughEntireReviewLambda } from '../lambdas/reviewLambdas/searchThroughEntireReviewsLambda';
import { UpdateReviewLikesLambda } from '../lambdas/likesLambdas/updateReviewLikesLambda';
import { AddNewBrandLambda } from '../lambdas/brandLambdas/addNewBrands';
import { CreateNewCommentLambda } from '../lambdas/commentLambdas/createNewCommentLambda';
import { GetCommentForReviewLambda } from '../lambdas/commentLambdas/getCommentLambda';
import { UpdateCommentLikesLambda } from '../lambdas/likesLambdas/updateCommentLikesLambda';
import { GetAllProductsLambda } from '../lambdas/productLamddas/getAllProducts';
import { GetProductLambda } from '../lambdas/productLamddas/getProduct';
import { AddNewProductReviewLambda } from '../lambdas/productLamddas/addNewProductReview';
import { GetAllUsersLambda } from '../lambdas/userLambdas/getAllUsersLambda';
import { CreateNewUserLambda } from '../lambdas/userLambdas/createNewUserLambda';

export const RestAPIStack = (parent: CdkStack) => {
    // deploy the lambdas first
    const healthLambda = HealthLambda(parent);
    const indexLambda = IndexLambda(parent);

    // user lambdas
    const getAllUsersLambda = GetAllUsersLambda(parent);
    const createNewUserLambda = CreateNewUserLambda(parent);

    // review lambdas
    const getAllReviewsLambda = GetAllReviewsLambda(parent);
    const getReviewsLambda = GetReviewsLambda(parent)
    const searchThroughEntireReviewsLambda = SearchThroughEntireReviewLambda(parent)
    
    // likes lambdas
    const updateReviewLikesLambda = UpdateReviewLikesLambda(parent);
    const updateCommentLikes = UpdateCommentLikesLambda(parent);

    // brand lambdas
    const getAllBrandLambda = GetAllBrandsLambda(parent);
    const addNewBrandsLambda = AddNewBrandLambda(parent);
    
    // comment lambdas
    const createNewCommentLambda = CreateNewCommentLambda(parent);
    const getCommentForReviewLambda = GetCommentForReviewLambda(parent);
    
    // product lambdas
    const getAllProductsLambda = GetAllProductsLambda(parent);
    const getProductLambda = GetProductLambda(parent);
    const addNewProductReview = AddNewProductReviewLambda(parent);
    
    const restAPI = new RestApi(parent, 'RekkoRestAPI', 
    {
        description: 'Rest API for Rekko',
        defaultCorsPreflightOptions: {
            statusCode: 200,
            allowOrigins: Cors.ALL_ORIGINS,
            allowHeaders:  [
                'Content-Type',
                'X-Amz-Date',
                'X-Amz-Security-Token',
                'Authorization',
                'X-Api-Key',
                'X-Requested-With',
                'Accept',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Headers'
            ],
            allowMethods: ['DELETE','GET','HEAD','OPTIONS','PATCH','POST','PUT']
        }
    });

    const indexResource: Resource = restAPI.root.addResource('home');
    const healthResource: Resource = restAPI.root.addResource('health');
    const userResource: Resource = restAPI.root.addResource('user');
    const productResource: Resource = restAPI.root.addResource('product');
    const reviewResource: Resource = restAPI.root.addResource('review');
    const likesResource: Resource = restAPI.root.addResource('likes');
    const commentResource: Resource = restAPI.root.addResource('comment');
    const brandResource: Resource = restAPI.root.addResource('brand');
 
    
    indexResource.addMethod('GET', new LambdaIntegration(indexLambda), {
        operationName: 'index',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });
    
    healthResource.addMethod('GET', new LambdaIntegration(healthLambda), {
        operationName: 'status',
        authorizationType: AuthorizationType.NONE, // TO DO this would need to change to cognito auth
    });

    // user routes
    const getAllUsersResource = userResource.addResource('getAllUsers');
    const createNewUserResource = userResource.addResource('createNewUser');
    
    getAllUsersResource.addMethod('GET', new LambdaIntegration(getAllUsersLambda), {
        operationName: 'getAllUsers',
        authorizationType: AuthorizationType.NONE
    });

    createNewUserResource.addMethod('POST', new LambdaIntegration(createNewUserLambda), {
        operationName: 'createNewUser',
        authorizationType: AuthorizationType.NONE
    });

    // review routes
    const getAllReviewResource = reviewResource.addResource('getAllReviews');
    const getReviewResource = reviewResource.addResource('getReviews');
    const searchThroughEntireReviewResource = reviewResource.addResource('searchThroughEntireReview');

    getAllReviewResource.addMethod('GET', new LambdaIntegration(getAllReviewsLambda), {
        operationName: 'getAllReviews',
        authorizationType: AuthorizationType.NONE
    });

    getReviewResource.addMethod('GET', new LambdaIntegration(getReviewsLambda), {
        operationName: 'getReviews',
        authorizationType: AuthorizationType.NONE
    });

    searchThroughEntireReviewResource.addMethod('GET', new LambdaIntegration(searchThroughEntireReviewsLambda), {
        operationName: 'searchThroughEntireReview',
        authorizationType: AuthorizationType.NONE
    });

    // likes route
    const updateReviewLikesResource = likesResource.addResource('updateReviewLikes');
    const updateCommentLikesResource = likesResource.addResource('updateCommentLikes');
    
    updateReviewLikesResource.addMethod('PUT', new LambdaIntegration(updateReviewLikesLambda), {
        operationName: 'updateReviewLikes',
        authorizationType: AuthorizationType.NONE
    });

    updateCommentLikesResource.addMethod('PUT', new LambdaIntegration(updateCommentLikes), {
        operationName: 'updateCommentLikes',
        authorizationType: AuthorizationType.NONE
    });

    // brand routes
    const getAllBrandsResource = brandResource.addResource('getAllBrands');
    const addNewBrandsResource = brandResource.addResource('addNewBrands');

    getAllBrandsResource.addMethod('GET', new LambdaIntegration(getAllBrandLambda), {
        operationName: 'getAllBrands',
        authorizationType: AuthorizationType.NONE
    });

    addNewBrandsResource.addMethod('POST', new LambdaIntegration(addNewBrandsLambda), {
        operationName: 'addNewBrands',
        authorizationType: AuthorizationType.NONE
    });

    // comment routes
    const getCommentsForReviewResource = commentResource.addResource('getCommentsForReview');
    const createNewCommentResource = commentResource.addResource('createNewComment');

    getCommentsForReviewResource.addMethod('GET', new LambdaIntegration(getCommentForReviewLambda), {
        operationName: 'getCommentsForReview',
        authorizationType: AuthorizationType.NONE
    });

    createNewCommentResource.addMethod('POST', new LambdaIntegration(createNewCommentLambda), {
        operationName: 'createNewComment',
        authorizationType: AuthorizationType.NONE
    });

    // product routes
    const getAllProductsResource = productResource.addResource('getAllProducts');
    const getProductResource = productResource.addResource('getProduct');
    const addNewProductReviewResource = productResource.addResource('addNewProductReview');

    getAllProductsResource.addMethod('GET', new LambdaIntegration(getAllProductsLambda), {
        operationName: 'getAllProducts',
        authorizationType: AuthorizationType.NONE
    });

    getProductResource.addMethod('GET', new LambdaIntegration(getProductLambda), {
        operationName: 'getProduct',
        authorizationType: AuthorizationType.NONE
    });

    addNewProductReviewResource.addMethod('POST', new LambdaIntegration(addNewProductReview), {
        operationName: 'addNewProductReview',
        authorizationType: AuthorizationType.NONE
    });
}