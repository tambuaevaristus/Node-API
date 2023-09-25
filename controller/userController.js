const express = require("express");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const router = require("../routes/userRoutes");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = User.create(req.body);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {});

exports.getUser = catchAsync(async (req, res, next) => {});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});


module.exports = router;