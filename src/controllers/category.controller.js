const Category = require("../models/category.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Mengambil semua kategori
exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ owner: req.user._id });
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: { categories },
  });
});

// Membuat kategori baru
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const category = await Category.create({
    name,
    description,
    owner: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: { category },
  });
});

// Mengupdate kategori berdasarkan ID
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!category) {
    return next(new AppError("Kategori tidak ditemukan", 404));
  }
  res.status(200).json({
    status: "success",
    data: { category },
  });
});

// Menghapus kategori berdasarkan ID
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!category) {
    return next(new AppError("Kategori tidak ditemukan", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});