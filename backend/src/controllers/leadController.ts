import { Request, Response } from "express";

import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      source,
      status,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !source ||
      !status
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    const lead = await Lead.create(
      req.body
    );

    res.status(201).json({
      message:
        "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search =
      (req.query.search as string) ||
      "";

    const status =
      (req.query.status as string) ||
      "";

    const source =
      (req.query.source as string) ||
      "";

    const sort =
      (req.query.sort as string) ||
      "latest";

    // Filters
    const filters: any = {};

    if (status) {
      filters.status = status;
    }

    if (source) {
      filters.source = source;
    }

    if (search) {
      filters.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Sorting
    const sortOption =
      sort === "oldest"
        ? { createdAt: 1 as const }
        : { createdAt: -1 as const };

    // Total count
    const totalLeads =
      await Lead.countDocuments(
        filters
      );

    // Paginated data
    const leads = await Lead.find(
      filters
    )
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      leads,
      currentPage: page,
      totalPages: Math.ceil(
        totalLeads / limit
      ),
      totalLeads,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      message:
        error.message ||
        "Server Error",
    });
  }
};

export const getLeadById = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      source,
      status,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !source ||
      !status
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message:
        "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message:
        "Lead deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};