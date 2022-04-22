import { Controller, Get, Param } from "@nestjs/common";

@Controller("randomNumber")
export class AppController {
  @Get()
  randomNumber() {
    const randomNumber = Math.random() * 100;

    console.log(randomNumber, new Date());

    return randomNumber;
  }

  @Get("/:number")
  async findOne(@Param("number") param: string) {
    return { param }; // You don't even need a return, I put it just to have some return.
  }
}
