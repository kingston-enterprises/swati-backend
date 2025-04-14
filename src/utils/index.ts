import asyncHandler from "express-async-handler";
import axios from "axios";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

/**
 * Transforms all string values within a given object to lowercase.
 * The original object is not modified; a new object with the lowercased strings is returned.
 *
 * @param {object} obj - The object to process.
 * @returns {object} A new object where all string values from the input object are lowercased.
 */
export const lowercaseObjectStrings = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj; // Return non-object inputs as is
  }

  const lowercasedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        lowercasedObj[key] = value.toLowerCase();
      } else {
        lowercasedObj[key] = value;
      }
    }
  }
  return lowercasedObj;
}


export const formatDate = (date : any) => {
  // Make a fuzzy time
  //var delta = Math.round(((new Date()) - (new Date(date))) / 1000);
  var delta = Math.round(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const WEEK = 604800;

  var fuzzy;

  if (delta <= 30) {
    // 0-30s
    fuzzy = "just now.";
  } else if (delta <= MINUTE) {
    //30s-1m
    fuzzy = `${delta}s`;
  } else if (delta <= HOUR) {
    // 1m-1h
    fuzzy =
      Math.floor(delta / MINUTE) < 0
        ? `${Math.floor(delta / MINUTE)}m ago`
        : `${Math.floor(delta / MINUTE)}m`;
  } else if (delta <= DAY) {
    // 1h-1d
    fuzzy =
      Math.floor(delta / HOUR) < 0
        ? `${Math.floor(delta / HOUR)}h ago`
        : `${Math.floor(delta / HOUR)}h`;
  } else if (delta <= WEEK) {
    // 1d-1w
    fuzzy =
      Math.floor(delta / DAY) < 0
        ? `${Math.floor(delta / DAY)}d ago`
        : `${Math.floor(delta / DAY)}d`;
  } else if (WEEK <= delta) {
    // 2w-
    fuzzy =
      Math.floor(delta / WEEK) < 0
        ? `${Math.floor(delta / WEEK)}w ago`
        : `${Math.floor(delta / WEEK)}w`;
  }

  return fuzzy;
};

/**
 * @function getId
 * @desc    generate UUID version 4
 * @access  public*/
export const getId = async () => {
  try {
    let response = await axios.get(
      "https://www.uuidgenerator.net/api/version4"
    );

    let uuidResponse = response.data;

    return uuidResponse;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * @function generateToken
 * @desc      Generate JWT
 * @access    Private
 */
export const generateToken = (id: mongoose.Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET || "SECRETTOKENFORFUNDMO"; // Fallback for development
  return jwt.sign({ id: id.toString() }, secret, {
    expiresIn: "30d",
  });
};

