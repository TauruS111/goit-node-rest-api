import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const contacts = await Contact.find({ owner });
    if (!contacts) {
      throw HttpError(404);
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const contact = await Contact.findOne({ _id: id, owner });
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: id, owner });
    if (!deletedContact) {
      throw HttpError(404);
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;
  try {
    const createdContact = await Contact.create({ name, email, phone, owner });
    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContact) {
      throw HttpError(404);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  try {
    const updateStatus = await Contact.findByIdAndUpdate(
      { _id: id, owner },
      { favorite },
      {
        new: true,
      }
    );
    res.status(200).json(updateStatus);
  } catch (error) {
    next(error);
  }
};
