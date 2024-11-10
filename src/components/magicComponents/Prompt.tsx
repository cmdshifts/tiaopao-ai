import React from "react"
import { Button } from "../ui/button"
import { ModelState, PromptFormSchema, PromptVariables } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays } from "date-fns"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form"
import { z } from "zod"
import { ProvinceComboBox } from "../customs/ProvinceComboBox"
import { DateRangePicker } from "../customs/DateRangePicker"
import { BudgetSlider } from "../customs/BudgetSlider"
import { TravelStyleComboBox } from "../customs/TravelStyleComboBox"
import { CompanionButton } from "../customs/CompanionButton"
import { toast } from "@/hooks/use-toast"
import { calculateDateDifference, findNestedErrorMessage } from "@/lib/utils"
import { HiOutlineTicket, HiTicket } from "react-icons/hi2"

interface PromptProps {
  promptVariables?: PromptVariables | null
  onStateChange: (state: ModelState, prompt?: PromptVariables) => void
}

export const Prompt: React.FC<PromptProps> = ({
  promptVariables,
  onStateChange,
}) => {
  const form = useForm<z.infer<typeof PromptFormSchema>>({
    resolver: zodResolver(PromptFormSchema),
    defaultValues: {
      province: undefined,
      date: { from: new Date(), to: addDays(new Date(), 2) },
      budget: 10000,
      companion: { value: "Alone", label: "ไปคนเดียว" },
      lifestyle: undefined,
    },
  })

  const orderedFields: (keyof z.infer<typeof PromptFormSchema>)[] = [
    "province",
    "date",
    "budget",
    "companion",
    "lifestyle",
  ]

  const onSubmit = form.handleSubmit(
    (values) => {
      onStateChange("generate", {
        province: values.province!,
        start_date: values.date?.from,
        end_date: values.date?.to,
        num_days:
          calculateDateDifference(values.date?.from, values.date?.to) + 1,
        budget: values.budget,
        companion: values.companion!,
        lifestyle: values.lifestyle!,
      })
    },
    (errors) => {
      for (const field of orderedFields) {
        const error = errors[field]
        if (error) {
          console.log(error)
          if (error.message) {
            toast({
              variant: "destructive",
              title: error.message,
              description: "โปรดกรอกข้อมูลให้ครบถ้วน",
              duration: 5000,
            })
            break
          } else if (typeof error === "object") {
            const nestedErrorMessage = findNestedErrorMessage(error)
            if (nestedErrorMessage) {
              toast({
                variant: "destructive",
                title: nestedErrorMessage,
                description: "โปรดกรอกข้อมูลให้ครบถ้วน",
                duration: 5000,
              })
              break
            }
          }
        }
      }
    }
  )

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2">
            <h2 className="text-heading-md font-semibold text-center">
              ไปเที่ยวไหนดี?
            </h2>
            <div className="grid gap-4 w-full max-w-[900px] grid-rows-[auto,1fr]">
              <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col p-2 gap-2">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-1">จังหวัด</FormLabel>
                        <FormControl>
                          <ProvinceComboBox
                            selectedAt={promptVariables?.province}
                            onValueChange={(province) =>
                              field.onChange(province)
                            }
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-1">วันที่</FormLabel>
                        <FormControl>
                          <DateRangePicker
                            selectedDate={
                              promptVariables?.start_date &&
                              promptVariables?.end_date
                                ? {
                                    from: new Date(promptVariables.start_date),
                                    to: new Date(promptVariables.end_date),
                                  }
                                : undefined
                            }
                            onSelectDate={(date) => field.onChange(date)}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-1">งบประมาณ</FormLabel>
                        <FormControl>
                          <BudgetSlider
                            budgetValue={promptVariables?.budget}
                            onSelectBudget={(budget) => field.onChange(budget)}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col p-2 gap-2">
                  <FormField
                    control={form.control}
                    name="companion"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel className="mb-1">
                          เพื่อนร่วมเดินทาง
                        </FormLabel>
                        <FormControl>
                          <CompanionButton
                            selectedCompanion={promptVariables?.companion}
                            onSelectCompanion={(companion) =>
                              field.onChange(companion)
                            }
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lifestyle"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-1">
                          สไตล์การท่องเที่ยว
                        </FormLabel>
                        <FormControl>
                          <TravelStyleComboBox
                            selectedValue={promptVariables?.lifestyle}
                            onValueChange={(lifestyle) =>
                              field.onChange(lifestyle)
                            }
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="row-span-2 flex justify-center items-center">
                <Button
                  size={"lg"}
                  className="flex justify-center items-center gap-2">
                  <HiTicket />
                  สร้าง
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
