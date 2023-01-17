import { Company } from "../entities/Company";
import { Metrics } from "../entities/Metrics";

export interface MetricsRepository {
  getPromotionMetricsByCompany: (company: Company["id"]) => Promise<Metrics>;
}
