import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TipOfDay, TipOfDayDocument } from "./tipofday.model";
import { CreateTipOfDayInput } from "./dto/create-tipofday.input";
import { UpdateTipOfDayInput } from "./dto/update-tipofday.input";

@Injectable()
export class TipOfDayService {
  constructor(
    @InjectModel(TipOfDay.name) private tipOfDayModel: Model<TipOfDayDocument>
  ) {}

  async findAll(): Promise<TipOfDay[]> {
    return this.tipOfDayModel.find().exec();
  }

  async findOneById(id: string): Promise<TipOfDay> {
    return this.tipOfDayModel.findById(id).exec();
  }

  async create(input: CreateTipOfDayInput): Promise<TipOfDay> {
    const newTip = new this.tipOfDayModel(input);
    return newTip.save();
  }

  async update(id: string, data: UpdateTipOfDayInput): Promise<TipOfDay> {
    return this.tipOfDayModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<TipOfDay> {
    return this.tipOfDayModel.findByIdAndDelete(id).exec();
  }
}
