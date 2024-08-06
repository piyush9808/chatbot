'use client';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios";

export default function Home() {

  const [response, setResponse] = useState("")
  const [question, setQuestion] = useState("")
  const apiUrl = process.env.NEXT_PUBLIC_API_URI;

  console.log(apiUrl);

  async function generateAnswer() {
    try {
      setResponse("loading...");
      console.log(process.env.REACT_APP_API_URI); // Debugging line to check if the environment variable is being read correctly
      const reponse = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          "contents": [{
            "parts": [{ "text": question }]
          }]
        }
      });

      setResponse(reponse['data']['candidates'][0]['content']['parts'][0]['text']);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResponse("Error fetching data.");
    }
  }



  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center gap-4 px-4 py-3 border-b bg-background">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <div className="text-lg font-medium">AI</div>
      </header>

      <div className="flex items-start gap-4 justify-end mt-4">
        <div className="grid gap-1 bg-muted rounded-lg p-3 max-w-[80%]">
          <div className="font-medium">You</div>
          <div className="prose text-muted-foreground">
            <p>{question}</p>
          </div>
        </div>
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>😀</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
          <div className="grid gap-1 bg-background rounded-lg p-3 max-w-[80%] text-muted-foreground">
            <div className="font-medium">AI</div>
            <div className="prose">
              <pre>{response}</pre>


            </div>
          </div>
        </div>

      </div>


      <div className="bg-background px-4 py-3 border-t">
        <div className="relative">
          <Textarea
            placeholder="Message AI..."
            onChange={(e) => setQuestion(e.target.value)}
            name="message"
            id="message"
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
          />
          <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3" onClick={generateAnswer}>
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
interface ArrowUpIconProps extends React.SVGProps<SVGSVGElement> {}

const ArrowUpIcon: React.FC<ArrowUpIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

interface XIcon extends React.SVGProps<SVGAElement>{}

const XIcon: React.FC<ArrowUpIconProps> = (props)=> {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}