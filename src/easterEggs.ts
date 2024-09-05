import { toast } from "sonner"

export function easterValues(value: Number): Number { 

  switch(`${value.toFixed(1)}`) {

    case "420.0":
      toast("The devils lettuce 🥬")
      break

    case "69.0":
      toast("Nice... 😏")
      break

    case "42.0":
      toast("The answer to life, the universe and everything 🌌")
      break

    case "1337.0":
      toast("Leet! 😎")
      break

    case "666.0":
      toast("The number of the beast 😈")
      break

    case "999.0":
      toast("The number of the beast, upside down 🙃")
      break

    case "62442.0":
      toast("The Ministry of Magic welcomes you! 🧙‍♂️")
      break

    case "404.0":
      toast("Error 404: Value not found 🤷‍♂️")
      break

    case "1984.0":
      toast("Big Brother is watching you 👁️")
      break

    default:
      break
  }

  return value
}
