// "use client"
// import React, { useState } from "react"
// import { ProvinceComboBox } from "./ProvinceComboBox"
// import { DateRangePicker } from "./DateRangePicker"
// import { CompanionComboBox } from "./CompanionComboBox"
// import { BudgetSlider } from "./BudgetSlider"
// import { TravelStyleComboBox } from "./TravelStyleComboBox"
// import { useForm } from "react-hook-form"
// import { PromptFormSchema, PromptVariables } from "@/lib/types"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form"
// import { Button } from "../ui/button"
// import { calculateDateDifference, formatDate } from "@/lib/utils"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog"
// import { addDays, set } from "date-fns"
// import axios from "axios"
// import { AnimateButton } from "./AnimateButton"

// interface PromptModalProps {
//   onCompleted?: (result: any) => void
//   onGenerating?: (isGenerating: boolean) => void
// }

// export const PromptModal: React.FC<PromptModalProps> = ({
//   onCompleted,
//   onGenerating,
// }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false)
//   const [variables, setVariables] = useState<PromptVariables | undefined>(
//     undefined
//   )
//   const [displayResult, setDisplayResult] = useState<
//     PromptVariables | undefined
//   >(undefined)
//   const [companion, setCompanion] = useState<string>("")
//   const [lifestyle, setLifestyle] = useState<string>("")

//   const form = useForm<z.infer<typeof PromptFormSchema>>({
//     resolver: zodResolver(PromptFormSchema),
//     defaultValues: {
//       province: "",
//       date: { from: new Date(), to: addDays(new Date(), 2) },
//       budget: 10000,
//       companion: "",
//       lifestyle: "",
//     },
//   })

//   const { isValid } = form.formState

//   const handleSubmit = (values: z.infer<typeof PromptFormSchema>) => {
//     setVariables({
//       province: values.province,
//       start_date: formatDate(values.date.from, "us"),
//       end_date: formatDate(values.date.to, "us"),
//       num_days:
//         calculateDateDifference(values.date.from, values.date.to, "days") + 1,
//       budget: values.budget,
//       companion: values.companion,
//       lifestyle: values.lifestyle,
//     })
//     setDisplayResult({
//       province: values.province,
//       start_date: formatDate(values.date.from, "th"),
//       end_date: formatDate(values.date.to, "th"),
//       num_days:
//         calculateDateDifference(values.date.from, values.date.to, "days") + 1,
//       budget: values.budget,
//       companion: companion,
//       lifestyle: lifestyle,
//     })
//   }

//   const handleGeneratePlan = async () => {
//     if (variables && displayResult) {
//       const response = await axios.post(
//         "/api/generate-trip",
//         JSON.stringify({
//           prompt: variables,
//           displayText: displayResult,
//         })
//       )

//       if (response.status === 200) {
//         if (onGenerating) {
//           onGenerating(false)
//         }
//         if (onCompleted) {
//           onCompleted(response.data)
//         }
//       }
//     }
//   }

//   return (
//     <>
//       <div>
//         <h2 className="text-heading-md">PromptModal</h2>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="flex flex-col gap-4">
//             <FormField
//               control={form.control}
//               name="province"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>จังหวัด</FormLabel>
//                   <FormControl>
//                     <ProvinceComboBox
//                       onValueChange={(province) => field.onChange(province)}
//                     />
//                   </FormControl>
//                   <FormDescription></FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="date"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>วันที่</FormLabel>
//                   <FormControl>
//                     <DateRangePicker
//                       onSelectDate={(date) => field.onChange(date)}
//                     />
//                   </FormControl>
//                   <FormDescription></FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="budget"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col mb-4">
//                   <FormLabel>งบประมาณ</FormLabel>
//                   <FormControl>
//                     <BudgetSlider
//                       onSelectBudget={(budget) => field.onChange(budget)}
//                     />
//                   </FormControl>
//                   <FormDescription></FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="companion"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>เพื่อนร่วมเดินทาง</FormLabel>
//                   <FormControl>
//                     <CompanionComboBox
//                       onValueChange={(companion) => field.onChange(companion)}
//                       getLabel={(value) => setCompanion(value)}
//                     />
//                   </FormControl>
//                   <FormDescription></FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifestyle"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>สไตล์การท่องเที่ยว</FormLabel>
//                   <FormControl>
//                     <TravelStyleComboBox
//                       onValueChange={(lifestyle) => field.onChange(lifestyle)}
//                       getLabel={(value) => setLifestyle(value)}
//                     />
//                   </FormControl>
//                   <FormDescription></FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Dialog open={isOpen}>
//               <DialogTrigger asChild>
//                 <Button
//                   type="submit"
//                   onClick={() => {
//                     if (isValid) {
//                       setIsOpen(!isOpen)
//                     }
//                   }}>
//                   สร้างแผนการท่องเที่ยว
//                 </Button>
//               </DialogTrigger>
//               <DialogContent
//                 hideClose
//                 onInteractOutside={(e) => {
//                   e.preventDefault()
//                 }}
//                 className="w-full sm:max-w-md">
//                 <DialogHeader>
//                   <DialogTitle>ยืนยันการสร้าง</DialogTitle>
//                   <DialogDescription>
//                     คุุณต้องการสร้างแผนการท่องเที่ยวด้วยข้อมูลดังต่อไปนี้หรือไม่
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="w-full">
//                   <div>
//                     <span className="font-semibold">จังหวัด: </span>
//                     <span>{displayResult?.province}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">วันที่: </span>
//                     <span>
//                       {displayResult?.start_date.toString()} -{" "}
//                       {displayResult?.end_date.toString()}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">จำนวน: </span>
//                     <span>{displayResult?.num_days} วัน</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">งบประมาณ: </span>
//                     <span>{displayResult?.budget} บาท</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">เพื่อนร่วมเดินทาง: </span>
//                     <span>{displayResult?.companion}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">สไตล์การท่องเที่ยว: </span>
//                     <span>{displayResult?.lifestyle}</span>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button
//                       type="button"
//                       variant="secondary"
//                       onClick={() => setIsOpen(!isOpen)}>
//                       ยกเลิก
//                     </Button>
//                   </DialogClose>
//                   <DialogClose asChild>
//                     <Button
//                       type="button"
//                       onClick={() => {
//                         setIsOpen(false)
//                         handleGeneratePlan()
//                         onGenerating && onGenerating(true)
//                       }}>
//                       สร้าง
//                     </Button>
//                   </DialogClose>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </form>
//         </Form>
//       </div>
//     </>
//   )
// }
