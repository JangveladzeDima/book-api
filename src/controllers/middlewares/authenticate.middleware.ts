import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { IAuthTokenService } from "../../core/domain/interfaces/services/auth-token-service.interface";

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  private async extractAuthHeaderPayload(req: Request) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    return (
      (token && (await this.authTokenService.getUserByToken(token))) || null
    );
  }

  private extractClaims(req: Request) {
    return this.extractAuthHeaderPayload(req);
  }

  constructor(
    @Inject("AuthTokenService")
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async use(req: Request, res: any, next: (error?: any) => void) {
    try {
      (req as any).user = await this.extractClaims(req);
      next();
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
