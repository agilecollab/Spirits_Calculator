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

import { 
  lookupIndexByTempAndPercent, 
  getKGtoLiterConversionFactor,
  getLiterToLiterConversionFactor,
  getPercentAbsoluteAlcByVol 
} from "@/alcoholmetricTables"

import { waterDensity } from "@/waterUtils"
import { easterValues } from "@/easterEggs"
function DilutionCalc() {

  //inputs
  const [ amount, setAmount ] = useState<string | number>(1200)
  const [ amountUnit, setAmountUnit ] = useState('KG')
  const [ fromAlcoholPercentage, setFromAlcoholPercentage ] = useState(53.7)
  const [ toAlcoholPercentage, setToAlcoholPercentage ] = useState(40)
  const [ alcoholTemp, setAlcoholTemp ] = useState(20)
  const [ waterTemp, setWaterTemp ] = useState(20)
  
  //outputs
  const [ calcMass, setCalcMass ] = useState(0.0)
  const [ calcVolume, setCalcVolume ] = useState(0.0)

  const compute = () => {
    const indexFrom = lookupIndexByTempAndPercent( alcoholTemp, fromAlcoholPercentage)
    const indexTo = lookupIndexByTempAndPercent( alcoholTemp, toAlcoholPercentage)

    if ( indexFrom === -1 || indexTo === -1 ) return

    const conversionFactor = amountUnit === 'L' ? getLiterToLiterConversionFactor(indexFrom) : getKGtoLiterConversionFactor(indexFrom)

    
    const correctedSpiritVolume = parseFloat(amount.toString()) * parseFloat(conversionFactor.toString())
    const correctedSpiritMass = correctedSpiritVolume / getKGtoLiterConversionFactor(indexFrom)
    const correctedAlcoholVolume = correctedSpiritVolume * ( getPercentAbsoluteAlcByVol(indexFrom) / 100 )
    const finalTargetVolume = correctedAlcoholVolume / ( getPercentAbsoluteAlcByVol(indexTo) / 100)
    const finalTargetMass = finalTargetVolume / getKGtoLiterConversionFactor(indexTo)
    const finalWaterMass = finalTargetMass - correctedSpiritMass
    const finalWaterVolume = finalWaterMass / waterDensity(waterTemp)

    setCalcMass(easterValues(finalWaterMass) as number)
    setCalcVolume(easterValues(finalWaterVolume) as number)
  }

  useEffect(()=>{
    compute(); 
  },[ amount, amountUnit, fromAlcoholPercentage, toAlcoholPercentage, alcoholTemp, waterTemp ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dilution</CardTitle>
        <CardDescription>
          Calculates the amount of water required to dilute to a desired % alcohol.
        </CardDescription>
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
          />             <ToggleGroup type="single" value={ amountUnit } onValueChange={ setAmountUnit } variant="outline">
              <ToggleGroupItem value="KG">Kg</ToggleGroupItem>
              <ToggleGroupItem value="L">Liter</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="orig_alcohol_percentage">From % Alcohol</Label>
            <Input id="orig_alcohol_percentage" type="number" value={ fromAlcoholPercentage } onChange={(e)=>{ setFromAlcoholPercentage(parseFloat(e.target.value)) }}/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="target_alcohol_percentage">To % Alcohol</Label>
            <Input id="target_alcohol_percentage" type="number" value={ toAlcoholPercentage } onChange={(e)=>{ setToAlcoholPercentage(parseFloat(e.target.value)) }}/>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="alcohol_temp_centigrade">Alcohol Temp (&deg;C)</Label>
            <Input id="alcohol_temp_centigrade" type="number" value={ alcoholTemp } onChange={(e)=>{ setAlcoholTemp(parseFloat(e.target.value)) }}/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="water_temp_centigrade">Water Temp (&deg;C)</Label>
            <Input id="water_temp_centigrade" type="number" value={ waterTemp } onChange={(e)=>{ setWaterTemp(parseFloat(e.target.value)) }}/>
          </div>
        </div>
      </CardContent>
      <CardFooter  className="grid grid-cols-2 gap-2 text-center">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Water to add</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl" data-testid="waterToAddMass">{ isNaN(calcMass) ? '--' : calcMass.toFixed(1)}&nbsp;Kg</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Corrected for temp.</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Water to add</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl" data-testid="waterToAddVolume">{ isNaN(calcVolume) ? '--' : calcVolume.toFixed(1)}&nbsp;L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Corrected for temp.</div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  )

}

export { DilutionCalc }
