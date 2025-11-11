import crypto from "crypto";
import User from "../models/User";

const ALPHANUMERIC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateReferralCode = (length: number): string => {
  const bytes: Buffer = crypto.randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += ALPHANUMERIC[bytes[i]! % ALPHANUMERIC.length];
  }

  return result;
};

export const createUniqueReferralCode = async (length = 8): Promise<string> => {
  let code: string = "";
  let exists = true;
  let attempts = 0;

  while (exists) {
    if (++attempts > 10) throw new Error("Failed to generate unique referral code");
    code = generateReferralCode(length);
    const existing = await User.findOne({ referralCode: code }).exec();
    exists = !!existing;
  }

  return code;
};

export default generateReferralCode;
