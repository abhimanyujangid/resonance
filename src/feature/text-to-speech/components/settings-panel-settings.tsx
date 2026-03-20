"use client";

import { useTypedAppFormContext } from "@/src/hooks/use-app-form";
import { ttsFormOptions } from "@/src/feature/text-to-speech/components/text-to-speech-form";
import { sliders } from "@/src/feature/text-to-speech/data/sliders";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Slider } from "@/src/components/ui/slider";
import { useStore } from "@tanstack/react-form";
import { VoiceSelector } from "@/src/feature/text-to-speech/components/voice-selector";

export function SettingsPanelSettings() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <>
      {/* Voice Style Dropdown Section */}
      <div className="border-b border-dashed p-4">
        <VoiceSelector />
      </div>

      {/* Voice Adjustments Section */}
      <div className="flex-1 p-4">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">{slider.leftLabel}</span>
                    <span className="text-muted-foreground text-xs">{slider.rightLabel}</span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    disabled={isSubmitting}
                    className="**:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-track]:h-1.5"
                  />
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </>
  );
}
