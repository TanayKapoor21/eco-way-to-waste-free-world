"use client";

import React, { useState, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { mockRecyclingCenters, RecyclingCenter } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const wasteTypes = ["all", "plastic", "paper", "glass", "electronics", "batteries", "metal", "organic"];

export function RecyclingLocator() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);

  const filteredCenters = useMemo(() => {
    if (selectedType === "all") {
      return mockRecyclingCenters;
    }
    return mockRecyclingCenters.filter((center) =>
      center.wasteTypes.includes(selectedType)
    );
  }, [selectedType]);

  if (!API_KEY) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Google Maps API Key Missing</AlertTitle>
        <AlertDescription>
          Please provide a Google Maps API key in your environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to use this feature.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
      <div className="lg:col-span-1 flex flex-col gap-4 h-full">
        <Card>
          <CardHeader>
            <CardTitle>Find a Center</CardTitle>
            <CardDescription>Filter by waste type to find a center near you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
            {filteredCenters.map(center => (
                <Card key={center.id} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedCenter(center)}>
                    <CardHeader>
                        <CardTitle className="text-base">{center.name}</CardTitle>
                        <CardDescription>{center.address}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
            </div>
        </div>
      </div>
      <div className="lg:col-span-2 h-full rounded-lg overflow-hidden border">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 28.5355, lng: 77.3910 }}
            defaultZoom={11}
            mapId="ewww-map"
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            {filteredCenters.map((center) => (
              <AdvancedMarker
                key={center.id}
                position={center.position}
                onClick={() => setSelectedCenter(center)}
              >
                <Pin />
              </AdvancedMarker>
            ))}

            {selectedCenter && (
              <InfoWindow
                position={selectedCenter.position}
                onCloseClick={() => setSelectedCenter(null)}
              >
                <div className="p-2">
                    <h3 className="font-bold text-lg">{selectedCenter.name}</h3>
                    <p className="text-muted-foreground">{selectedCenter.address}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {selectedCenter.wasteTypes.map(type => (
                            <Badge key={type} variant="secondary" className="capitalize">{type}</Badge>
                        ))}
                    </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
