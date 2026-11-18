export interface Release {
  label: string; version: string; versionCode: number; releaseDate: string; fileName: string;
  downloadUrl: string; fileSize: string; sha256: string; minimumAndroidVersion: string;
  available: boolean; releaseNotes: string[]; supportedFeatures?: string[];
}
export interface ReleaseCatalog { appName: string; latest: Release; stable: Release; }
