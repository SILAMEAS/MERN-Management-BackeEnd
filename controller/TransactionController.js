import TransactionModel from "../models/TransactionModel.js ";

export const get = async (req, res) => {
  try {
    const allTransaction = await TransactionModel.find({
      user_id: req.user._id,
    }).sort({ date: 1 });
    res.json(allTransaction);
  } catch (error) {
    res.json(error);
  }
};
export const getOnlyOne = async (req, res) => {
  try {
    const allTransaction = await TransactionModel.findById(req.params.id);
    res.json(allTransaction);
  } catch (error) {
    res.json(error);
  }
};
export const create = async (req, res) => {
  const data = {
    amount: req.body.amount,
    desription: req.body.desription,
    date: req.body.date,
    user_id: req.user._id,
    category_id: req.body.category_id,
  };

  try {
    const transaction = new TransactionModel(data);
    await transaction.save();

    res.json({ message: "success" });
  } catch (error) {
    res.json(error);
  }
};
export const delete_ = async (req, res) => {
  try {
    const allTransaction = await TransactionModel.findByIdAndDelete(
      req.params.id
    );
    res.json({ message: "deleted" });
  } catch (error) {
    res.json(error);
  }
};
export const update = async (req, res) => {
  const data = {
    amount: req.body.amount,
    desription: req.body.desription,
    date: req.body.date,
  };

  try {
    await TransactionModel.findByIdAndUpdate({ _id: req.params.id }, data);
    const one = await TransactionModel.findById(req.params.id);
    res.json({ message: "succes_update" });
  } catch (error) {
    res.json(error);
  }
};
