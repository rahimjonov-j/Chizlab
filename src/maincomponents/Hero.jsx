import { MorphingText } from "@/components/ui/text-morphing";
import { RippleButton } from "../components/ripple";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Hero() {
  return (
    <>
      <div className=" flex flex-col justify-center overflow-x-hidden  gap-10 mx-auto pt-30 items-center lg:flex-row">
        <div className="flex flex-col  items-center gap-10 lg:gap-20 ">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-4xl flex flex-col gap-3">
              Biznig saytimizda{" "}
              <MorphingText
                words={["Ilmiy", "Maqola", "Taqdimot"]}
                className="text-blue-600"
              />{" "}
              kitoblarni topishingiz mumkun!
            </h1>
          </div>
          <div className="flex gap-2 ">
            <RippleButton className="inline-flex py-2 px-10 items-center gap-2 rounded-lg bg-blue-500  text-sm font-semibold text-white transition  duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 ">
              Bog'lanish{" "}
              <span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </RippleButton>
          </div>
        </div>
        <div
          className="relative w-160 h-100 bg-cover brightness-120 bg-center rounded-md overflow-hidden dark:brightness-80"
          style={{
            backgroundImage: "url('/hero img.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>
    </>
  );
}
