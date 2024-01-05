import { ConfigService } from "@nestjs/config";

export const jwtConfig = async (ConfigService : ConfigService) => {
    return {
        secret: ConfigService.get('JWT_KEY')
    }
}