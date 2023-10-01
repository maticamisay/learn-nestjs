import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TipOfDay } from "./tipofday.model";
import { TipOfDayService } from "./tipofday.service";
import { CreateTipOfDayInput } from "./dto/create-tipofday.input";
import { UpdateTipOfDayInput } from "./dto/update-tipofday.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { RoleType } from "src/user/role.model";
import { Roles } from "src/common/decorators/roles.decorator";

@Resolver((of) => TipOfDay)
export class TipOfDayResolver {
  constructor(private readonly tipOfDayService: TipOfDayService) {}

  @Query((returns) => [TipOfDay], { name: "allTipsOfDay" })
  async getAllTips(): Promise<TipOfDay[]> {
    return this.tipOfDayService.findAll();
  }

  @Query((returns) => TipOfDay, { nullable: true })
  async getTip(@Args("id") id: string): Promise<TipOfDay> {
    return this.tipOfDayService.findOneById(id);
  }

  @Mutation((returns) => TipOfDay)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async createTipOfDay(
    @Args("input") input: CreateTipOfDayInput
  ): Promise<TipOfDay> {
    return this.tipOfDayService.create(input);
  }

  @Mutation((returns) => TipOfDay)
  async updateTipOfDay(
    @Args("id") id: string,
    @Args("data") data: UpdateTipOfDayInput
  ): Promise<TipOfDay> {
    return this.tipOfDayService.update(id, data);
  }

  @Mutation((returns) => TipOfDay)
  async deleteTipOfDay(@Args("id") id: string): Promise<TipOfDay> {
    return this.tipOfDayService.delete(id);
  }
}
