import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Trash2, FileCheck, UploadCloud, ChevronUp, User, MoreHorizontal, MessageCircle, Paperclip, Loader2, Car, Search, CreditCard, CheckCircle2 } from "lucide-react"
import { useClaimStore } from "@/store/useClaimStore"

export const BaseNodeUI = ({ title, status, id, isCustom, children, aiExplanation, note }: { title: string, status: string, id: string, isCustom?: boolean, children?: React.ReactNode, aiExplanation?: string, note?: string }) => {
  const removeCustomNode = useClaimStore((state) => state.removeCustomNode)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [explanationText, setExplanationText] = useState("")
  const [showAi, setShowAi] = useState(false)

  const getBadgeVariant = (status: string) => {
    if (status === "Completed" || status === "Report Completed") return "bg-emerald-50 text-emerald-700 border-emerald-200"
    if (status === "In Progress") return "bg-blue-50 text-blue-700 border-blue-200"
    if (status === "Info") return "bg-slate-100 text-slate-700 border-slate-200"
    return "bg-amber-50 text-amber-700 border-amber-200"
  }

  const handleExplain = () => {
    setShowAi(!showAi)
    if (!showAi && !explanationText) {
      setIsAiLoading(true)
      setTimeout(() => {
        setExplanationText(aiExplanation || `This step involves the ${title} phase. It indicates that the insurance company is actively processing this specific requirement of your claim.`)
        setIsAiLoading(false)
      }, 1000)
    }
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto border shadow-sm relative z-10 ${isCustom ? 'bg-slate-50/50 border-slate-200' : 'bg-white border-slate-200'}`}>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-md flex items-center justify-center border ${isCustom ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
            {isCustom ? <MessageCircle className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </div>
          <div className="flex flex-col">
            <span className="font-bold !text-slate-900 text-sm">{title}</span>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5">ID: {id?.split('-')[1] || id?.slice(-4) || "0000"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center justify-center border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${getBadgeVariant(status)}`}>
            {status}
          </span>
          {isCustom ? (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0" onClick={() => removeCustomNode(id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-50 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-5">
          {children && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {children}
            </div>
          )}
        </div>

        {note && (
          <div className="px-5 pb-5 animate-in fade-in duration-300">
            <div className="bg-amber-50/50 rounded-md p-3.5 border border-amber-100 flex items-start gap-3">
              <MessageCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Attached Note</span>
                <span className="text-sm font-medium !text-slate-900 break-words leading-relaxed">{note}</span>
              </div>
            </div>
          </div>
        )}

        {showAi && (
          <div className="px-5 pb-5 animate-in slide-in-from-top-2">
            <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5">AI Contextual Analysis</h4>
                {isAiLoading ? (
                  <span className="text-sm text-blue-600 font-medium">Generating analysis...</span>
                ) : (
                  <p className="text-sm !text-slate-900 font-medium leading-relaxed">{explanationText}</p>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-400 hover:bg-blue-100 hover:text-blue-700 -mt-1 -mr-1" onClick={() => setShowAi(false)}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50">
        <Button variant="ghost" size="sm" className="!text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm font-semibold px-3 h-8 text-xs" onClick={handleExplain}>
          <Sparkles className="h-3.5 w-3.5 mr-2 text-blue-500" />
          Explain with AI
        </Button>
      </CardFooter>
    </Card>
  )
}

const TowingNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="This step tracks the physical movement of your vehicle. The towing service has successfully picked up your vehicle from the specified location and transported it to the repair facility.">
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Location</span> <span className="font-semibold !text-slate-900 text-sm">{data.pickupLocation}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Date</span> <span className="font-semibold !text-slate-900 text-sm">{data.towingDate}</span></div>
  </BaseNodeUI>
)

const NotificationNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="This is the official registration of your accident. 'Agreed Minutes' means both parties involved in the collision filled out and signed a mutual accident report, speeding up the claim.">
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Date</span> <span className="font-semibold !text-slate-900 text-sm">{data.dateTime}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Reason</span> <span className="font-semibold !text-slate-900 text-sm">{data.reasonForDamage}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Report Type</span> <span className="font-semibold !text-slate-900 text-sm">{data.reportType}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Party</span> <span className="font-semibold !text-slate-900 text-sm">{data.reportingParty}</span></div>
  </BaseNodeUI>
)

const AppraisalNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="An independent expert has been assigned to assess the damage to your vehicle. They calculate the repair costs and determine if parts need replacement or repair. The report is complete.">
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Assignment</span> <span className="font-semibold !text-slate-900 text-sm">{data.expertAssignmentDate}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Expert</span> <span className="font-semibold !text-slate-900 text-sm">{data.expertInfo}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Contact</span> <span className="font-semibold !text-slate-900 text-sm">{data.contact}</span></div>
  </BaseNodeUI>
)

const SubstituteRentalNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="A temporary vehicle has been assigned to you so you can continue your daily routines without disruption while your main vehicle is being serviced.">
    <div className="col-span-full flex items-center gap-3 mb-2">
      <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
        <Car className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <div className="text-sm font-semibold !text-slate-900">{data.vehicleModel}</div>
        <div className="text-xs font-medium text-slate-500">Provided Substitute</div>
      </div>
    </div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Duration</span> <span className="font-semibold !text-slate-900 text-sm">{data["vehicle Duration"]}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Extra Duration</span> <span className="font-semibold !text-slate-900 text-sm">{data.extraDuration}</span></div>
  </BaseNodeUI>
)

const FileReviewNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="The insurance back-office team is carefully reviewing all submitted documentation, appraisal reports, and legal requirements to reach a final decision on your coverage.">
    <div className="col-span-full mb-2 bg-slate-50 rounded-md p-3 border border-slate-100 flex items-start gap-3">
      <Search className="h-4 w-4 text-slate-400 mt-0.5" />
      <span className="text-sm font-medium !text-slate-900">Internal review team is verifying the procedural compliance of the compiled claim file.</span>
    </div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Referral Date</span> <span className="font-semibold !text-slate-900 text-sm">{data.reviewReferralDate}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Completion Est.</span> <span className="font-semibold !text-slate-900 text-sm">{data["reviewCompletion Date"]}</span></div>
  </BaseNodeUI>
)

const PaymentInformationNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="Your claim has been financially cleared. This section details the finalized amount that will be transferred directly to your registered bank account.">
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Paid To</span> <span className="font-semibold !text-slate-900 text-sm">{data.paidTo}</span></div>
    <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">IBAN</span> <span className="font-semibold !text-slate-900 text-sm">{data.iban}</span></div>
    <div className="col-span-full mt-2 flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-100">
      <div className="flex items-center gap-3">
        <CreditCard className="h-5 w-5 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-900">Total Approved Amount</span>
      </div>
      <span className="text-lg font-bold text-emerald-700">{data.paymentAmount}</span>
    </div>
  </BaseNodeUI>
)

const ClosedNode = ({ data }: { data: any }) => (
  <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="The entire claim lifecycle has concluded. All obligations from the insurance provider have been fulfilled, and this specific file is permanently archived.">
    <div className="col-span-full flex flex-col items-center justify-center py-4 text-center">
      <CheckCircle2 className="h-10 w-10 text-blue-500 mb-3" />
      <h4 className="text-base font-bold !text-slate-900 mb-1">Process Completed</h4>
      <p className="text-sm font-medium text-slate-500">Finalized on: {data["completion Date"]}</p>
    </div>
  </BaseNodeUI>
)

const DeductionNode = ({ data }: { data: any }) => {
  const [docStatus, setDocStatus] = useState<"idle" | "analyzing" | "success">("idle")
  const [showDocUpload, setShowDocUpload] = useState(false)
  const handleDocAnalysis = () => { setDocStatus("analyzing"); setTimeout(() => setDocStatus("success"), 2000) }

  return (
    <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note} aiExplanation="Deductions are amounts subtracted from your final payout. 'Occupational Deduction' might apply based on how the vehicle is used, and 'Policy Deductible' is the fixed amount you agreed to pay.">
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Occupational</span> <span className="font-semibold !text-slate-900 text-sm">{data["occupational Deduction"]}</span></div>
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Appreciation</span> <span className="font-semibold !text-slate-900 text-sm">{data["appreciation Deduction"]}</span></div>
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Deductible</span> <span className="font-semibold !text-slate-900 text-sm">{data["policy Deductible"]}</span></div>
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Non Damage Amount</span> <span className="font-semibold !text-slate-900 text-sm">{data.nonDamageAmount}</span></div>
      
      <div className="col-span-full mt-2 bg-red-50/50 p-4 rounded-lg border border-red-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-0.5">Action Required</span>
          <span className="text-sm font-semibold text-red-900">{data["action Required"]}</span>
        </div>
        <Button size="sm" className="w-full sm:w-auto bg-white hover:bg-red-50 text-red-700 border border-red-200 font-semibold shadow-sm" onClick={() => setShowDocUpload(!showDocUpload)}>
          <UploadCloud className="h-4 w-4 mr-2" />
          {showDocUpload ? "Cancel Upload" : "Upload Document"}
        </Button>
      </div>

      {showDocUpload && (
        <div className="col-span-full mt-2 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm animate-in slide-in-from-top-2">
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-bold !text-slate-900 uppercase tracking-wider">Document Analyzer</span>
          </div>
          <div className="p-6">
            {docStatus === "idle" && (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-700 transition-all cursor-pointer" onClick={handleDocAnalysis}>
                <div className="h-10 w-10 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">Click to upload mock document</span>
              </div>
            )}
            {docStatus === "analyzing" && (
              <div className="rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 border border-slate-100">
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin mb-3" />
                <span className="text-sm font-semibold !text-slate-900 mb-1">Scanning document...</span>
              </div>
            )}
            {docStatus === "success" && (
              <div className="rounded-lg p-8 flex flex-col items-center justify-center bg-emerald-50 border border-emerald-100">
                <FileCheck className="h-8 w-8 text-emerald-600 mb-2" />
                <span className="text-sm font-bold text-emerald-900">Validation Successful</span>
                <Button size="sm" className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm" onClick={() => setShowDocUpload(false)}>Complete Upload</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </BaseNodeUI>
  )
}

const DefaultNode = ({ data }: { data: any }) => {
  const displayData = Object.entries(data).filter(([key]) => key !== 'title' && key !== 'status' && key !== 'id' && key !== 'isCustom' && key !== 'noteDetails' && key !== 'isAttachment' && key !== 'note')
  
  return (
    <BaseNodeUI title={data.title} status={data.status} id={data.id} isCustom={data.isCustom} note={data.note}>
      {data.noteDetails && !data.isAttachment && (
        <div className="col-span-full text-slate-800 bg-slate-50 p-4 rounded-md border border-slate-100 font-medium text-sm leading-relaxed">
          {data.noteDetails}
        </div>
      )}
      {data.isAttachment && (
        <div className="col-span-full flex items-center gap-3 p-3 bg-white rounded-md border border-slate-200 shadow-sm">
          <div className="h-8 w-8 bg-slate-50 rounded flex items-center justify-center border border-slate-100">
            <FileCheck className="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <div className="text-sm font-semibold !text-slate-900">{data.noteDetails}</div>
            <div className="text-xs font-medium text-slate-500">Uploaded Document</div>
          </div>
        </div>
      )}
      {displayData.map(([key, value]) => (
        <div key={key} className="flex flex-col break-words">
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</span> 
          <span className="font-semibold !text-slate-900 text-sm">{String(value)}</span>
        </div>
      ))}
    </BaseNodeUI>
  )
}

const componentRegistry: Record<string, React.FC<{ data: any }>> = {
  "Towing Service": TowingNode,
  "Claim Notification": NotificationNode,
  "Appraisal": AppraisalNode,
  "Substitute Rental Vehicle": SubstituteRentalNode,
  "File Review": FileReviewNode,
  "Payment Information": PaymentInformationNode,
  "Closed": ClosedNode,
  "Deduction Reason": DeductionNode,
}

export const TimelineNode = ({ data, index, isLast }: { data: any, index: number, isLast?: boolean }) => {
  const Component = componentRegistry[data.title] || DefaultNode
  const addCustomNode = useClaimStore((state) => state.addCustomNode)
  const updateNodeData = useClaimStore((state) => state.updateNodeData)
  const [isAdding, setIsAdding] = useState<"none" | "note" | "attachment">("none")
  const [noteContent, setNoteContent] = useState("")

  const handleOpenNote = () => {
    setIsAdding("note")
    setNoteContent(data.note || "")
  }

  const submitNote = (type: "note" | "attachment") => {
    if (type === "note") {
      updateNodeData(data.id, { note: noteContent.trim() ? noteContent.trim() : undefined })
      setIsAdding("none")
    } else {
      if (!noteContent.trim()) return
      const stableId = `custom-${Date.now()}`
      addCustomNode(index, {
        id: stableId,
        title: "Additional Attachment",
        status: "Info",
        isCustom: true,
        isAttachment: true,
        noteDetails: noteContent.trim()
      })
      setIsAdding("none")
      setNoteContent("")
    }
  }

  return (
    <div className="relative pl-6 md:pl-10 pb-8 w-full group">
      {!isLast && <div className="absolute left-2.5 md:left-4 top-10 bottom-0 w-[2px] bg-slate-200" />}
      <div className="absolute left-2.5 md:left-4 top-8 w-2.5 h-2.5 -translate-x-[4px] rounded-full bg-blue-500 ring-4 ring-slate-50 z-20" />
      
      <div className="flex flex-col w-full relative z-10">
        <Component data={data} />
        
        <div className="px-4 mt-3 max-w-2xl mx-auto w-full">
          {isAdding === "none" ? (
            <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              <Button variant="ghost" size="sm" className="h-7 text-xs !text-slate-900 hover:!text-slate-900 font-semibold px-2.5 bg-white border border-slate-200 shadow-sm shrink-0" onClick={handleOpenNote}>
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                {data.note ? "Edit Note" : "Add Note"}
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs !text-slate-900 hover:!text-slate-900 font-semibold px-2.5 bg-white border border-slate-200 shadow-sm shrink-0" onClick={() => setIsAdding("attachment")}>
                <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                Add Attachment
              </Button>
            </div>
          ) : (
            <div className="flex gap-1.5 sm:gap-2 items-center bg-white p-1.5 rounded-md border border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-200 w-full overflow-hidden">
              <div className="pl-1 sm:pl-2 text-slate-400 shrink-0">
                {isAdding === "note" ? <MessageCircle className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
              </div>
              <input
                type="text"
                className="flex-1 min-w-0 bg-transparent text-sm font-medium px-1.5 sm:px-2 outline-none placeholder:text-slate-400 !text-slate-900"
                placeholder={isAdding === "note" ? "Type your note..." : "Enter file name or URL..."}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitNote(isAdding)}
                autoFocus
              />
              <Button size="sm" onClick={() => submitNote(isAdding)} className="h-7 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-2.5 sm:px-3 text-xs shrink-0">Save</Button>
              <Button size="icon" variant="ghost" onClick={() => setIsAdding("none")} className="h-7 w-7 shrink-0 text-slate-400 hover:text-slate-700">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}