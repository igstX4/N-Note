import { ConfigService } from "@nestjs/config"

export const configMongo = async (ConfigService : ConfigService) => {
    return {
        uri: `mongodb+srv://${ConfigService.get('MONGO_USER')}:${ConfigService.get('MONGO_PASSWORD')}@cluster0.u0vzfki.mongodb.net/?retryWrites=true&w=majority`
    }
}