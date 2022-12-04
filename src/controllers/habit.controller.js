import Habit from "../models/habit";

export default {
  get: async ({ query }, res) => {
    try {
      const habit = query
        ? await Habit.aggregate([{ $match: query }])
        : await Habit.find();
      return res.status(200).json({ data: habit });
    } catch (error) {
      res.status(400).json({ message: "User's data not found" });
    }
  },
  add: async (req, res) => {
    try {
      const body = req.body;
      const habit = await new Habit(body).save();

      return res.status(200).json({ data: habit });
    } catch (error) {
      res.status(400).json({ messsage: "Cannot create habit" });
    }
  },
  update: async (req, res) => {
    try {
      const body = req.body;

      const habit = await Habit.findOneAndUpdate({ _id: req.params.id }, body, {
        new: false,
      });

      res.status(200).json({ data: habit });
    } catch (error) {
      res.status(400).json({ messsage: "Can't update habit" });
    }
  },
  remove: async (req, res) => {
    try {
      const id = req.params.id;
      const habit = await Habit.findOneAndDelete({ _id: id });

      res.status(200).json({ data: habit });
    } catch (error) {
      res.status(400).json({ message: "Cannot delete habit" });
    }
  },
};
