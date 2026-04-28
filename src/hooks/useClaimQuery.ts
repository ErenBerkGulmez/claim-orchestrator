import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import mockData from "@/data/mockClaim.json"

const processDetailSchema = z.object({
  title: z.string(),
  status: z.string(),
}).catchall(z.any())

const claimSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  "estimated Remaining Time": z.string(),
  currentStatus: z.string(),
  processDetails: z.array(processDetailSchema),
})

export const useClaimQuery = () => {
  return useQuery({
    queryKey: ["claimData"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const parsed = claimSchema.parse(mockData)
      return {
        ...parsed,
        processDetails: parsed.processDetails.map((detail, index) => ({
          ...detail,
          id: `node-${index}`
        }))
      }
    },
  })
}