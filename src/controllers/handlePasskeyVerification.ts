import { Request, Response } from "express";
import authUserModel from "../model/userModel";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import envConfig from "../config/env";
const handlePasskeyVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, credential } = req.body;
  try {
    if(email && credential){
        const findUser = await authUserModel.findOne({ email });
        if (findUser) {
          const previousKey = findUser.privateKey;
          const verificationResult = await verifyRegistrationResponse({
            expectedChallenge: previousKey,
            expectedOrigin: envConfig.expectedOrigin,
            expectedRPID: envConfig.relyingPartyId,
            response: credential,
          });
    
          if (!verificationResult.verified) {
            return <any>res.status(501).json({ error: "Something went wrong" });
          } else {
            const findUserAndAddPasskey = await authUserModel.findOne({email});
            const userID = findUserAndAddPasskey?._id;
            const addPasskey = await authUserModel.findByIdAndUpdate(userID, 
                {passkey: verificationResult.registrationInfo},
                {new:true}
            )
            if(addPasskey){
                return <any>res.status(200).json({ verified: true });
            }
            return <any>res.status(501).json({
                issues: "Not implemented!",
                status: 501,
                details: "Failed to update auth user model, please try again.",
              });
          }
        } else {
          return <any>res.status(404).json({
            issues: "User not found!",
            status: 404,
            details: "The user not found, please try again.",
          });
        }
    }else{
        return <any>res.status(400).json({
            issues: "Bad request!",
            status: 400,
            details: "All fields are required, check info and please try again.",
          }); 
    }
   
  } catch (error: any) {
    return <any>res.status(500).json({
      issues: "Internal server error!",
      status: error.status,
      details: error.message,
    });
  }
};
export default handlePasskeyVerification;
