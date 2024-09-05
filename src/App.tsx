import { useState } from 'react'
import { Button } from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { PanelLeft } from "lucide-react"
import { VolumeCalc } from "@/components/volumeCalc"
import { DilutionCalc } from "@/components/dilutionCalc"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { DarkModeToggle } from "@/components/darkModeToggle"

import { useTheme } from "@/components/theme-provider"

import sovLogoBlk from '/sov_logo_blk.svg'
import sovLogoWht from '/sov_logo_wht.svg'

import sovLogoFullBlk from '/sov_logo_full_blk.svg'
import sovLogoFullWht from '/sov_logo_full_wht.svg'

import './index.css'
import './App.css'

function App() {

  const { theme } = useTheme()
  const [ navSheetOpen, setNavSheetOpen ] = useState(false)

  const themedLogo = theme === 'dark' ? sovLogoWht : sovLogoBlk
  const themedFullLogo = theme === 'dark' ? sovLogoFullWht : sovLogoFullBlk

  const onTabValueChange = () => {
    if(navSheetOpen) setNavSheetOpen(false)
  }

  return (
    <>
      <div className="flex justify-between items-center p-2">
      <Dialog>
        <DialogTrigger><img src={themedLogo} className="logo small" alt="Sons of Vancouver Distillery" /></DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-2">
            <img src={themedFullLogo} className="logo mx-auto" alt="Sons of Vancouver Distillery" />
            <DialogTitle className="text-center pb-4">Sons of Vancouver Spirits Calculator</DialogTitle>
           
            <ScrollArea className="rounded-md max-h-96 border mt-4 px-4">
            <div className="grid gap-3 text-sm pt-4 pb-4"> 
              <p>Sons of Vacouver Spirits Calculator is a spirits calculator based on the Canadian Revenue Agency's Tables of Alcoholometry.</p>
              <p>Although the calculators are based on Canadian tables, these tables are based on the standard international OIML tables and should therefore be suitable for use in many other countries.</p>
              <p>With these calculators we hope to partially alleviate the mundane manual calculations and table look-ups that Canadian distillers must perform on a daily basis. So far this includes:</p>
              <p><span className="font-bold">Volume Calculator:</span> Calculates the volume of spirit at 20&deg;C, based on the 1980 Canadian Alcoholmetric Tables.</p>
              <p><span className="font-bold">Dilution Calculator:</span> Calculates the amount of water required to dilute to a desired % alcohol.</p>
              <p>We are very pleased to offer these tools for free in hopes of making our fellow distiller's days a wee bit easier. In return, we always appreciate feedback and/or a bit of word of mouth or social media advertising. Please post or write about us. We'd really appreciate it!</p> 
            </div>
            </ScrollArea>
            
          </DialogHeader>
          <div className="flex justify-between">
            <a href="https://sonsofvancouver.ca">sonsofvancouver.ca</a>
          <div className="flex w-max gap-2"> 
            <a href="https://www.instagram.com/sonsofvancouver/"><Instagram /></a>
            <Separator orientation="vertical" />
            <a href="https://www.facebook.com/sonsofvancouver/"><Facebook /></a>
            <Separator orientation="vertical" />
            <a href="https://youtube.com/@sonsofvancouver"><Youtube /></a>
          </div>
          </div>
        </DialogContent>
      </Dialog>
<DarkModeToggle />

      </div> 
      <Tabs defaultValue="volume" className="mb-2" onValueChange={ onTabValueChange }  >
        <Sheet open={ navSheetOpen } onOpenChange={ setNavSheetOpen }>
          <div  className="hidden">
            <SheetTrigger asChild><Button size="icon" variant="outline" className="mt-2">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button></SheetTrigger>
          </div>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle><img src={themedLogo} className="logo" alt="Sons of Vancouver Distillery" />
              </SheetTitle>
              <SheetDescription>
                <TabsList className="grid w-full grid-cols-1 h-max items-start">
                  <TabsTrigger value="volume">Volume</TabsTrigger>
                  <TabsTrigger value="dilution">Dilution</TabsTrigger>
                </TabsList>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <TabsList className="w-full" >
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="dilution">Dilution</TabsTrigger>
        </TabsList>

        <TabsContent value="volume"><VolumeCalc />
        </TabsContent>
        <TabsContent value="dilution"><DilutionCalc />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default App
