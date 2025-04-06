import { Request, Response } from 'express';
import asyncHander from '../utils/asyncHanler';
import { db } from '..';

//create task controller
export const createTask = asyncHander(async (req: Request, res: Response) => {
  // destructure the request body
  const { title, description } = req.body;
  // check field are not empty
  if (!title || !description) {
    return res.status(400).json({
      statusCode: 400,
      data: null,
      message: 'Please fill all fields',
    });
  }
  // check the title length at least 3 characters
  if (title.length < 3) {
    return res.status(400).json({
      statusCode: 400,
      data: null,
      message: 'Title must be at least 3 characters',
    });
  }
  // check the description length at least 10 characters
  if (description.length < 10) {
    return res.status(400).json({
      statusCode: 400,
      data: null,
      message: 'Description must be at least 10 characters',
    });
  }
  // create the task
  try {
    const task = await db.task.create({
      data: {
        title,
        description,
        //@ts-ignore
        userId: req?.user,
      },
    });
    return res.status(201).json({
      statusCode: 201,
      data: task,
      message: 'Task created successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: error.message,
    });
  }
});

//get all tasks controller
export const getAllTasks = asyncHander(async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.user;
  try {
    const tasks = await db.task.findMany({
      where: {
        userId: id,
      },
    });
    return res.status(200).json({
      statusCode: 200,
      data: tasks,
      message: 'Tasks fetched successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: error.message,
    });
  }
}
);

// delete task controller
export const deleteTask = asyncHander(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await db.task.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      statusCode: 200,
      data: task,
      message: 'Task deleted successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: error.message,
    });
  }
});