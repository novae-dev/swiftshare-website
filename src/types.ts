export interface Release {
  label: string;
  version: string;
  versionCode: number;
  releaseDate: string;
  fileName: string;
  downloadUrl: string;
  fileSize: string;
  sha256: string;
  minimumAndroidVersion: string;
  compatibility: string;
  requirements: string[];
  available: boolean;
  releaseNotes: string[];
  supportedFeatures: string[];
}

export interface ReleaseCatalog {
  appName: string;
  latest: Release;
  previous: Release;
  stable: Release;
}
