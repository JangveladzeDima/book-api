import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { ControllerModule } from "./controllers/controller.module";
import { JwtModule } from "@nestjs/jwt";

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "process.env.JWT_SECRET",
      signOptions: { expiresIn: "6000s" },
    }),
    DatabaseModule,
    ControllerModule,
  ],
})
export class AppModule {}
