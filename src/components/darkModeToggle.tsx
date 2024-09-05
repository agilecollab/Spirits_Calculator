

import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from "lucide-react"


export function DarkModeToggle() {
   const { theme, setTheme } = useTheme()
   const isDark = theme === 'dark';

  
  return (<div className="flex gap-2"> <Sun /> <Switch checked={ isDark } onCheckedChange={ (currentVal) => { 
    if(currentVal) {
      setTheme("dark") 
    } else { 
      setTheme("light") 
    }
  }}/> <Moon /></div>)
}
