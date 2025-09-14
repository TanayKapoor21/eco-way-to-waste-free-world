
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { classifyWasteFromImage, ClassifyWasteFromImageOutput } from "@/ai/flows/classify-waste-from-image";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader, Recycle, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WasteClassifier() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassifyWasteFromImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setIsLoading(false);
    // Reset file input
    const fileInput = document.getElementById('waste-photo') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  const handleSubmit = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select an image file to classify.",
      });
      return;
    }
    if (!preview) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await classifyWasteFromImage({ photoDataUri: preview });
      setResult(response);
    } catch (error: any) {
      console.error("Error classifying waste:", error);
      if (error.message && error.message.includes("503")) {
          toast({
            variant: "destructive",
            title: "AI Model Overloaded",
            description: "The AI is currently busy. Please wait a moment and try again.",
          });
      } else {
        toast({
          variant: "destructive",
          title: "Classification Failed",
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Waste Classifier</CardTitle>
        <CardDescription>
          Upload a photo of a waste item, and our AI will suggest how to dispose of or reuse it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!preview && (
          <div className="space-y-2">
            <Label htmlFor="waste-photo">Upload Photo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="waste-photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {preview && (
          <div className="relative w-full aspect-video rounded-md overflow-hidden border">
            <Image
              src={preview}
              alt="Waste preview"
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint="waste item"
            />
            <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-8 w-8" onClick={handleClear} disabled={isLoading}>
                <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Disposal Suggestion</AlertTitle>
              <AlertDescription>
                <p className="whitespace-pre-wrap">{result.disposalMethods}</p>
              </AlertDescription>
            </Alert>
            <Alert variant="default" className="border-green-500/50 text-green-900 dark:text-green-200 [&>svg]:text-green-500">
              <Recycle className="h-4 w-4" />
              <AlertTitle className="text-green-700 dark:text-green-300">Reuse/Reduction Tip</AlertTitle>
              <AlertDescription>
                <p className="whitespace-pre-wrap">{result.reductionSuggestion}</p>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {isLoading && (
            <div className="flex items-center justify-center p-8 rounded-md bg-muted">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">AI is thinking...</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!file || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Classifying...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Classify Waste
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
