import { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { easterValues } from "@/easterEggs" 
import { toast } from "sonner"

import { 
  lookupIndexByTempAndSG, 
  getLiterToLiterConversionFactor, 
  getKGtoLiterConversionFactor, 
  getPercentAbsoluteAlcByVol 
} from "@/alcoholmetricTables"

function VolumeCalc() {

  //inputs
  const [ amount, setAmount ] = useState<string | number>(1200)
  const [ amountUnit, setAmountUnit ] = useState('KG') 
  const [ specificGravity, setSpecificGravity ] = useState(980.0)
  const [ temperature, setTemperature ] = useState(20.0)
  //outputs
  const [ calcLitersOfSpirit, setCalcLitersOfSpirit ] = useState(0.0)
  const [ calcLitersOfEthanol, setCalcLitersOfEthanol ] = useState(0.0)
  const [ calcAlcoholPercentage, setCalcAlcoholPercentage ] = useState(0.0)

  const compute = () => {
    const index = lookupIndexByTempAndSG(temperature, specificGravity)

    if ( index === -1 ) return
    const conversionFactor : number = amountUnit === 'L' ? getLiterToLiterConversionFactor(index) : getKGtoLiterConversionFactor(index)
    const correctedAmount = parseFloat(amount.toString()) * parseFloat(conversionFactor.toString())

    setCalcLitersOfSpirit( easterValues(correctedAmount) as number );
    setCalcLitersOfEthanol( easterValues( getPercentAbsoluteAlcByVol(index) / 100 * correctedAmount) as number )
    setCalcAlcoholPercentage( easterValues(getPercentAbsoluteAlcByVol(index) ) as number )
  }

  useEffect(()=>{
    console.log("specificGravity", specificGravity, typeof(specificGravity), "temperature", temperature, typeof(temperature))

    if(specificGravity < 780.0) {
      return
    } else if (specificGravity > 1000.8) {
      return
    }

    if (temperature < -20.0) {
      return
    } else if (temperature > 40.0) {
      return
    }
    compute()
  }, [ temperature, specificGravity, amount, amountUnit ])

  return (
    <Card> 
      <CardHeader>
        <CardTitle>Volume</CardTitle>
        <CardDescription>Calculates the volume of spirit at 20&deg;C, based on the 1980 Canadian Alcoholmetric Tables.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1 space-x-1">
          <Label htmlFor="amount">Amount</Label>
          <div className="flex gap-x-1"><Input
            id="amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}   onBlur={(e) => {
              let value = parseFloat(e.target.value)

              if (isNaN(value)) {
                setAmount("")
                return
              }

              if (value < 0) {
                value = 0
              }

              setAmount(value)
            }}
          />  <ToggleGroup type="single" value={ amountUnit } onValueChange={ setAmountUnit } variant="outline">
              <ToggleGroupItem value="KG">Kg</ToggleGroupItem>
              <ToggleGroupItem value="L">Liter</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-1">
          <div className="space-y-1">
            <Label htmlFor="specific_gravity">Specific Gravity</Label>
            <Input id="specific_gravity" type="number" min="780.0" max="1000.8" value={ specificGravity }  onChange={(e) => {
              setSpecificGravity(parseFloat(e.target.value))
            }}
              onBlur={(e) => {
                let value = parseFloat(e.target.value)
                if (isNaN(value)) {
                  setSpecificGravity(780)
                  return
                }

                if (value < 780.0) {
                  value = 780.0
                  toast("Specific Gravity must be greater than 780.0")
                } else if (value > 1000.8) {
                  value = 1000.8
                  toast("Specific Gravity must be less than 1000.8")
                }

                setSpecificGravity(value)
              }}/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="temp_centigrade">Temp (&deg;C)</Label>
            <Input
              id="temp_centigrade"
              type="number"
              min="-20.0"
              max="40.0"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))} 
              onBlur={(e) => {
                let value = parseFloat(e.target.value)
                console.log("value", value, typeof(value))
                if (isNaN(value)) {
                  setTemperature(20.0)
                  return;
                }

                if (value < -20.0) {
                  value = -20.0
                  toast("Temperature must be greater than -20.0")
                } else if (value > 40.0) {
                  value = 40.0
                  toast("Temperature must be less than 40.0")
                }

                setTemperature(value)
              }}
            />          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 md:grid-cols-3">

        <Card  className="text-center">
          <CardHeader className="pb-2">
            <CardDescription>Spirits</CardDescription>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl">{ isNaN(calcLitersOfSpirit) ? '--' : calcLitersOfSpirit.toFixed(1) }&nbsp;L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">@&nbsp;20&deg;C</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardDescription>Abs<span className="hidden sm:inline">olute</span> Ethyl Alc<span className="hidden sm:inline">ohol</span></CardDescription>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl">{ isNaN(calcLitersOfEthanol) ? '--' : calcLitersOfEthanol.toFixed(1) }&nbsp;L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">@&nbsp;20&deg;C</div>
          </CardContent>
        </Card>

        <Card  className="text-center col-span-2 md:col-span-1">

          <CardHeader className="pb-2">
            <CardDescription>%&nbsp;Alcohol</CardDescription>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl">{ isNaN(calcAlcoholPercentage) ? '--' : calcAlcoholPercentage }&nbsp;%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">{ isNaN(calcAlcoholPercentage) ? '--' : (calcAlcoholPercentage * 2).toFixed(1) } Proof</div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>

  )

}

export { VolumeCalc }
