import express from 'express';
const router = express.Router();

import {  
    createCategory,
    getCategories,
    getSingleCategory,
    updateCategory
  } from '../controllers/categoryController.js';

  import { protect, admin } from '../middleware/authMiddleware.js';
  import checkObjectId from '../middleware/checkObjectId.js';



  router.route('/').get(getCategories).post(protect, admin, createCategory);
  // router.route('/categories').get(getCategories)
  router.route('/:id').get(checkObjectId, getSingleCategory)
  .put(protect, admin, checkObjectId, updateCategory)
  

  export default router;