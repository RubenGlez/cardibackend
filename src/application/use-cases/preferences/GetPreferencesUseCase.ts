import { Preferences } from "../../../domain/entities/Preferences"
import { User } from "../../../domain/entities/User"
import { PreferencesRepository } from "../../../domain/repositories/PreferencesRepository"
import GetPreferencesByUserService from "../../../domain/services/preferences/GetPreferencesByUserService"

export default class GetPreferencesUseCase {
  private readonly _getPreferencesByUserService: GetPreferencesByUserService

  constructor(companyRepository: PreferencesRepository) {
    this._getPreferencesByUserService = new GetPreferencesByUserService(companyRepository)
  }

  async run(tenantId: User['id']): Promise<Preferences> {
    return await this._getPreferencesByUserService.run(tenantId)
  }
}
