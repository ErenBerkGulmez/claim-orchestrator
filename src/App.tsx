import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, FileText, Activity, ShieldCheck, Loader2, LayoutDashboard, Settings, Users, Bell, Search, ChevronRight, FileDigit, Car, FileOutput, Construction } from "lucide-react"
import { TimelineNode } from "@/components/timeline/TimelineRegistry"
import { useClaimQuery } from "@/hooks/useClaimQuery"
import { useClaimStore } from "@/store/useClaimStore"

export default function App() {
  const { data, isLoading, error } = useClaimQuery()
  const nodes = useClaimStore((state) => state.nodes)
  const setNodes = useClaimStore((state) => state.setNodes)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (data?.processDetails && nodes.length === 0) {
      setNodes(data.processDetails)
    }
  }, [data, setNodes, nodes.length])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-600 font-medium">
        Error loading claim data. Please refresh.
      </div>
    )
  }

  const displayNodes = nodes.length > 0 ? nodes : (data?.processDetails || [])
  const actionRequiredNode = displayNodes.find((node: any) => node["action Required"]) as any
  const actionRequired = actionRequiredNode?.["action Required"]

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <aside className="w-[260px] bg-white hidden lg:flex flex-col border-r border-slate-200 shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-3 shadow-sm">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold !text-slate-900 tracking-tight">ClaimOrchestrator</span>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Main Navigation</div>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("dashboard")}
            className={`justify-start w-full transition-all ${activeTab === "dashboard" ? "text-blue-700 bg-blue-50 font-bold" : "text-slate-600 hover:!text-slate-900 hover:bg-slate-50 font-medium"}`}
          >
            <LayoutDashboard className="h-4 w-4 mr-3" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("claims")}
            className={`justify-start w-full transition-all ${activeTab === "claims" ? "text-blue-700 bg-blue-50 font-bold" : "text-slate-600 hover:!text-slate-900 hover:bg-slate-50 font-medium"}`}
          >
            <FileText className="h-4 w-4 mr-3" />
            Active Claims
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("customers")}
            className={`justify-start w-full transition-all ${activeTab === "customers" ? "text-blue-700 bg-blue-50 font-bold" : "text-slate-600 hover:!text-slate-900 hover:bg-slate-50 font-medium"}`}
          >
            <Users className="h-4 w-4 mr-3" />
            Customers
          </Button>
        </div>

        <div className="p-4 m-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            JS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold !text-slate-900 truncate">Jane Smith</div>
            <div className="text-xs text-slate-500 font-medium truncate">Senior Adjuster</div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 shrink-0">
          
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="bg-blue-600 p-1.5 rounded-md shadow-sm">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold !text-slate-900 tracking-tight">ClaimOrchestrator</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <span className="hover:!text-slate-900 cursor-pointer transition-colors" onClick={() => setActiveTab("dashboard")}>Claims</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="!text-slate-900 font-bold">{activeTab === "dashboard" ? `File #${data.fileNo}` : activeTab}</span>
            </div>

            <div className="relative max-w-md w-full ml-8">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by file number or customer..." 
                className="h-9 w-full rounded-md border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all !text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:!text-slate-900 hover:bg-slate-50">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden lg:flex text-slate-500 hover:!text-slate-900 hover:bg-slate-50">
              <Settings className="h-5 w-5" />
            </Button>

            <div className="lg:hidden ml-1 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              JS
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-full">
            {activeTab === "dashboard" ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-black !text-slate-900 tracking-tight flex items-center gap-3">
                      {data.title}
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md inline-flex items-center justify-center whitespace-nowrap shadow-sm">
                        {data.currentStatus}
                      </span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5 font-medium">Reviewing process details and required actions for this claim.</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="bg-white flex-1 md:flex-none shadow-sm font-bold border-slate-200 text-slate-700"><FileOutput className="h-4 w-4 mr-2 text-slate-400"/> Export</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex-1 md:flex-none shadow-sm text-white font-bold">Update Status</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
                  <Card className="bg-white border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                    <CardContent className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-md bg-slate-50 border border-slate-100">
                          <FileDigit className="h-4 w-4 text-slate-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Number</p>
                      </div>
                      <p className="text-2xl font-black !text-slate-900">{data.fileNo}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                    <CardContent className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-md bg-slate-50 border border-slate-100">
                          <Activity className="h-4 w-4 text-slate-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
                      </div>
                      <p className="text-2xl font-black !text-slate-900 truncate">In Progress</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                    <CardContent className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-md bg-slate-50 border border-slate-100">
                          <Clock className="h-4 w-4 text-slate-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimation</p>
                      </div>
                      <p className="text-2xl font-black !text-slate-900">{data["estimated Remaining Time"]}</p>
                    </CardContent>
                  </Card>

                  <Card className={`shadow-sm col-span-2 sm:col-span-1 ${actionRequired ? 'bg-red-50/50 border-red-200' : 'bg-white border-slate-200'}`}>
                    <CardContent className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-md border ${actionRequired ? 'bg-red-100 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                          <AlertTriangle className={`h-4 w-4 ${actionRequired ? 'text-red-600' : 'text-slate-500'}`} />
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${actionRequired ? 'text-red-700' : 'text-slate-500'}`}>Actionability</p>
                      </div>
                      <p className={`text-lg font-black leading-tight truncate ${actionRequired ? 'text-red-900' : '!text-slate-900'}`}>
                        {actionRequired ? actionRequired : "No action needed"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
                  
                  <div className="xl:col-span-2">
                    <div className="w-full relative">
                      {displayNodes.map((node: any, index: number) => (
                        <TimelineNode key={node.id || `node-${index}`} data={node} index={index} isLast={index === displayNodes.length - 1} />
                      ))}
                    </div>
                  </div>

                  <div className="xl:col-span-1 flex flex-col gap-5 mt-2 xl:mt-0">
                    <Card className="bg-white border-slate-200 shadow-sm shrink-0">
                      <CardHeader className="border-b border-slate-100 pb-3 pt-4 px-5 bg-slate-50/50">
                        <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400" /> Policy Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex flex-col">
                          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">Policy Type</span>
                            <span className="text-sm font-bold !text-slate-900">Comprehensive</span>
                          </div>
                          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">Coverage Limit</span>
                            <span className="text-sm font-bold !text-slate-900">₺250,000</span>
                          </div>
                          <div className="px-5 py-3.5 flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">Deductible</span>
                            <span className="text-sm font-bold !text-slate-900">₺2,500</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm shrink-0">
                      <CardHeader className="border-b border-slate-100 pb-3 pt-4 px-5 bg-slate-50/50">
                        <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                           <Car className="h-4 w-4 text-slate-400" /> Vehicle Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
                            <Car className="h-6 w-6 text-slate-600" />
                          </div>
                          <div>
                            <div className="text-base font-bold !text-slate-900 tracking-tight">Volkswagen Polo</div>
                            <div className="text-sm font-medium text-slate-500 mt-0.5">1.4 TDI 90 Comf.</div>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-md p-3 flex justify-between items-center border border-slate-100">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Plate</span>
                          <span className="text-sm font-bold !text-slate-900 tracking-widest">34 ABC 123</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm shrink-0">
                      <CardHeader className="border-b border-slate-100 pb-3 pt-4 px-5 bg-slate-50/50">
                        <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <Settings className="h-4 w-4 text-slate-400" /> Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col gap-2.5">
                        <Button variant="outline" className="w-full justify-start text-slate-700 font-bold border-slate-200 shadow-sm hover:bg-slate-50">
                          <FileOutput className="h-4 w-4 mr-3 text-slate-400" />
                          Generate Formal Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-slate-700 font-bold border-slate-200 shadow-sm hover:bg-slate-50">
                          <Users className="h-4 w-4 mr-3 text-slate-400" />
                          Contact Appraisal Expert
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-200">
                  <Construction className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold !text-slate-900 tracking-tight capitalize">{activeTab} Module</h2>
                <p className="text-slate-500 mt-2 max-w-sm font-medium text-base">
                  This module is currently under construction and falls outside the scope of the claim overview case study.
                </p>
                <Button 
                  className="mt-6 bg-blue-600 hover:bg-blue-700 shadow-sm font-bold text-sm px-6"
                  onClick={() => setActiveTab("dashboard")}
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </main>

        <nav className="lg:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-40 flex justify-around items-center h-16 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === "dashboard" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutDashboard className={`h-5 w-5 ${activeTab === "dashboard" ? "fill-blue-50 stroke-blue-600" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("claims")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === "claims" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <FileText className={`h-5 w-5 ${activeTab === "claims" ? "fill-blue-50 stroke-blue-600" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Claims</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("customers")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === "customers" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Users className={`h-5 w-5 ${activeTab === "customers" ? "fill-blue-50 stroke-blue-600" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Customers</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("preferences")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === "preferences" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Settings className={`h-5 w-5 ${activeTab === "preferences" ? "fill-blue-50 stroke-blue-600" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
          </button>
        </nav>

      </div>
    </div>
  )
}