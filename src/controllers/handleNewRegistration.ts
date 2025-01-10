import { Request, Response } from "express";
import authUserModel from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/env";
import { generateRegistrationOptions } from "@simplewebauthn/server";

const handleNewRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    // TODO: Check is all fields are available or not.....
    if (username && password && confirmPassword && email) {
      // TODO: Check is user already available or not....
      const checkUserId = await authUserModel.findOne({ email });

      // TODO: Check is user id registerd before or not.....
      if (!checkUserId) {
        // TODO: Check is password and confirm password is same or not....
        if (password === confirmPassword) {
          // TODO Password hashing....
          const salt = await bcrypt.genSalt(15);
          const hashPassword = await bcrypt.hash(password, salt);

          // TODO Store the information into database....
          const createNewUser = new authUserModel({
            username,
            email,
            password: hashPassword,
          });

          // TODO: Save the details....
          const newUser = await createNewUser.save();

          // TODO Check is the user created or not....
          if (newUser) {
            // ! Find just created user details...
            const getJustCreatedUser = await authUserModel.findOne({
              email,
            });

            // TODO: Take action if just creared user not found.....
            if (getJustCreatedUser) {
              // TODO: Assign jwt token.....
              const token = jwt.sign(
                { authUserId: getJustCreatedUser._id },
                envConfig.jwtSecretKey,
                {
                  expiresIn: "1d",
                }
              );

              // ! Send successful response.....
              if (token) {


                // ! Find The User by Email.....
                const getUserName = await authUserModel.findOne({ email });
                
                if (getUserName) {
                  // ! Create passkey challenge......
                  const challengePayload = await generateRegistrationOptions({
                    rpID: envConfig.relyingPartyId,
                    rpName: envConfig.relyingPartyName,
                    userName: getUserName?.username,
                  });

                  if(challengePayload){
                  // ! Find id of the user......
                  const getUserId = getUserName._id;

                  // TODO: If Id Exists then......
                  if (getUserId) {

                    // TODO: Add the created passkeys......
                    const getUserAndAddChallenge = await authUserModel.findByIdAndUpdate(
                      getUserId,
                      { privateKey: challengePayload.challenge },
                      {
                        new: true,
                      }
                    );
                    if(!getUserAndAddChallenge){
                      return <any>res.status(501).json({
                        message: "Not Implemented!",
                        status: 501,
                        details: "Challenge was not saved!",
                      });
                    }else{
                      return <any>res.status(201).json({
                        message: "Registration successfull!",
                        details: "Congratulations!",
                        privateKey: challengePayload
                      });
                    }
                  }else{
                    return <any>res.status(404).json({
                      issues: "User id found!",
                      status: 404,
                      details: "The user id was not found, please try again.",
                    });
                  }
                  }else{
                    return <any>res.status(501).json({
                      message: "Not Implemented!",
                      status: 501,
                      details: "Challenge was not created!",
                    });
                  }


                }else{
                  return <any>res.status(404).json({
                    issues: "User not found!",
                    status: 404,
                    details: "The user not found, please try again.",
                  });
                }
              } else {
                return <any>res.status(501).json({
                  message: "Not Implemented!",
                  status: 501,
                  details: "Token not been assigned!",
                });
              }
            } else {
              return <any>res.status(404).json({
                issues: "User not found!",
                status: 404,
                details: "The user not found, please try again.",
              });
            }
          } else {
            return <any>res.status(501).json({
              issues: "Not implemented!",
              status: 501,
              details: "The user not been created, please try again.",
            });
          }
        } else {
          return <any>res.status(400).json({
            issues: "Bad Request!",
            status: 400,
            details: "Password and confirm password is not same.",
          });
        }
      } else {
        return <any>res.status(409).json({
          issues: "Conflict!",
          status: 409,
          details: "User already exist, please login instead of registration.",
        });
      }
    } else {
      return <any>res.status(400).json({
        issues: "Bad Request!",
        status: 400,
        details: "Fill up all the fields carefully.",
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

export default handleNewRegistration;
