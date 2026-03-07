"use client";
import { TextInputPanel } from "@/src/feature/text-to-speech/components/text-input-panel";
import { VoicePreviewPlaceholder } from "@/src/feature/text-to-speech/components/voice-preview-placeholder";
import { SettingsPanel } from "@/src/feature/text-to-speech/components/settings-pannel";
import {
  TextToSpeechForm,
  defaultTTSValues,
} from "@/src/feature/text-to-speech/components/text-to-speech-form";

export default function TextToSpeechView() {
  return (
    <TextToSpeechForm defaultValues={defaultTTSValues}>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  );
}
