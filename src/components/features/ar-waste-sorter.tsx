"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { arWasteSorter, ARWasteSorterOutput } from '@/ai/flows/ar-waste-sorter';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Camera, Loader, Trash2, Recycle, Leaf, Package } from 'lucide-react';
import { Badge } from '../ui/badge';

const categoryConfig = {
    wet: { icon: Leaf, label: 'Wet Waste', color: 'bg-green-500', description: "Food scraps, organic material." },
    dry: { icon: Package, label: 'Dry Waste', color: 'bg-gray-500', description: "Non-recyclable, non-organic waste." },
    ewaste: { icon: Trash2, label: 'E-Waste', color: 'bg-blue-500', description: "Electronics, batteries, cables." },
    recyclable: { icon: Recycle, label: 'Recyclable', color: 'bg-yellow-500 text-black', description: "Paper, glass, some plastics." },
    unknown: { icon: Loader, label: 'Detecting...', color: 'bg-muted', description: "Point your camera at a waste item." }
};

const SCAN_INTERVAL = 5000; // 5 seconds

export function ARWasteSorter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ARWasteSorterOutput>({ category: 'unknown', itemName: 'N/A' });
  const { toast } = useToast();
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleNextScan = useCallback(() => {
    if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
    }
    scanTimeoutRef.current = setTimeout(() => {
        captureAndClassify();
    }, SCAN_INTERVAL);
  }, []);


  const captureAndClassify = useCallback(async () => {
    if (isProcessing || !videoRef.current || !canvasRef.current || !hasCameraPermission || videoRef.current.videoWidth === 0) {
      scheduleNextScan();
      return;
    }
    
    setIsProcessing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameDataUri = canvas.toDataURL('image/jpeg', 0.5);
        
        try {
            const response = await arWasteSorter({ frameDataUri });
            setResult(response);
        } catch (error) {
            console.error('AR Sorter error:', error);
            // We don't show a toast here to avoid spamming the user on repeated failures.
            // The component will just try again after the interval.
        }
    }
    
    setIsProcessing(false);
    scheduleNextScan(); // Schedule the next scan after this one is done.
  }, [isProcessing, hasCameraPermission, scheduleNextScan]);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
        }
    }
  }, [toast]);


  useEffect(() => {
    if (hasCameraPermission) {
      // Start the scanning loop once camera is ready
      const initialScanTimeout = setTimeout(() => {
        captureAndClassify();
      }, 1000); // Wait 1 sec for camera to initialize

      return () => clearTimeout(initialScanTimeout);
    }
  }, [hasCameraPermission, captureAndClassify]);

  const currentCategory = categoryConfig[result.category];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AR Waste Sorter</CardTitle>
        <CardDescription>Point your camera at a waste item for real-time sorting guidance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full aspect-video rounded-md overflow-hidden border bg-muted">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
          <canvas ref={canvasRef} className="hidden" />
          
          {!hasCameraPermission && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                <Camera className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">Camera Access Required</h3>
                <p className="text-center">Please allow camera access to use this feature.</p>
            </div>
          )}

          {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader className="h-8 w-8 animate-spin text-white" />
              </div>
          )}
        </div>

        <Alert className={`${currentCategory.color} border-0 text-white transition-colors duration-500`}>
          <currentCategory.icon className="h-4 w-4 text-white" />
          <AlertTitle className="flex justify-between items-center">
             <span>{currentCategory.label}</span>
             <Badge variant="outline" className="border-white text-white">
                {result.itemName}
            </Badge>
          </AlertTitle>
          <AlertDescription>
           {currentCategory.description}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
