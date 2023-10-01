import { Module } from "@nestjs/common";
import { TipOfDayService } from "./tipofday.service";
import { TipOfDayResolver } from "./tipofday.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { TipOfDay, TipOfDaySchema } from "./tipofday.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TipOfDay.name, schema: TipOfDaySchema },
    ]),
  ],
  providers: [TipOfDayService, TipOfDayResolver],
})
export class TipofdayModule {}
