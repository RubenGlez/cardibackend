import { Promotion } from "../../../domain/entities/Promotion"
import { User } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import GetCompanyByIdService from "../../../domain/services/company/GetCompanyByIdService"

export default class GetPromotionsUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor(promotionRepository: PromotionRepository, companyRepository: CompanyRepository) {
    this._promotionRepository = promotionRepository
    this._getCompanyByIdService = new GetCompanyByIdService(companyRepository)
  }

  async run(tenantId: User['id'], companyId: Promotion['company']): Promise<Promotion[]> {
    const company = await this._getCompanyByIdService.run(companyId)

    const isCompanyOwnedByTenant = company.owner === tenantId
    if (!isCompanyOwnedByTenant) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const promotions = await this._promotionRepository.getAllByCompany(companyId)
    return promotions
  }
}
