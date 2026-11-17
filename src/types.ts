export interface Release {
  appName: string;
  version: string;
  versionCode: number;
  releaseDate: string;
  fileName: string;
  downloadUrl: string;
  fileSize: string;
  sha256: string;
  minimumAndroidVersion: string;
  available: boolean;
  releaseNotes: string[];
  /** Feature ids (see src/data/features.ts) that the released APK supports. */
  supportedFeatures?: string[];
}
