
import { toast } from "sonner";

// Types
export interface PackageSearchResult {
  objects: {
    package: {
      name: string;
      version: string;
      description: string;
      links: {
        npm: string;
        homepage?: string;
        repository?: string;
        bugs?: string;
      };
      publisher: {
        username: string;
        email: string;
      };
      maintainers: Array<{
        username: string;
        email: string;
      }>;
    };
    score: {
      final: number;
      detail: {
        quality: number;
        popularity: number;
        maintenance: number;
      };
    };
    searchScore: number;
  }[];
  total: number;
  time: string;
}

export interface PackageDownloads {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export interface PackageDetails {
  name: string;
  version: string;
  description: string;
  main?: string;
  types?: string;
  repository?: {
    type: string;
    url: string;
  };
  homepage?: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  } | string;
  license?: string;
  bugs?: {
    url: string;
  };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  keywords?: string[];
  versions: Record<string, any>;
  time: Record<string, string>;
  dist?: {
    fileCount?: number;
    unpackedSize?: number;
    npm_signature?: string;
  };
}

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  weeklyDownloads: number;
  score: number;
}

export interface DetailedPackageInfo extends PackageInfo {
  allVersions: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  fileCount: number;
  unpackedSize: number;
  license: string;
  lastPublished: string;
  homepage: string;
  repository: string;
  issues: string;
  keywords: string[];
}

// Mock data for development - we'll replace this with real API calls
const MOCK_PACKAGES: PackageInfo[] = Array.from({ length: 1000 }, (_, i) => ({
  name: `package-${i + 1}`,
  version: `1.0.${i % 10}`,
  description: `This is a description for package-${i + 1}`,
  weeklyDownloads: Math.floor(Math.random() * 10000000),
  score: Math.random(),
}));

// NPM registry API base URLs
const NPM_SEARCH_API = "https://registry.npmjs.com/-/v1/search";
const NPM_REGISTRY_API = "https://registry.npmjs.com";
const NPM_DOWNLOADS_API = "https://api.npmjs.org/downloads/point/last-week";

// API token
const NPM_TOKEN = "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";

// Headers for API requests
const headers = {
  "Content-Type": "application/json",
  ...(NPM_TOKEN ? { Authorization: `Bearer ${NPM_TOKEN}` } : {}),
};

// Caching mechanism
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Check if data is in cache and still valid
 */
function getFromCache<T>(key: string): T | null {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

/**
 * Store data in cache
 */
function setInCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

/**
 * Fetch packages from NPM registry with pagination
 */
export const fetchPackages = async (
  page: number = 0,
  size: number = 100
): Promise<{ packages: PackageInfo[]; totalPages: number }> => {
  const cacheKey = `packages_${page}_${size}`;
  const cached = getFromCache<{ packages: PackageInfo[]; totalPages: number }>(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    // For this demo, we'll use mock data
    // In a real application, we would fetch from the NPM API
    const from = page * size;
    const mockData = MOCK_PACKAGES.slice(from, from + size);
    
    const result = {
      packages: mockData,
      totalPages: Math.ceil(MOCK_PACKAGES.length / size),
    };
    
    setInCache(cacheKey, result);
    return result;
    
    // In a real application:
    /*
    const response = await fetch(
      `${NPM_SEARCH_API}?text=&size=${size}&from=${from}&popularity=1.0&quality=0.0&maintenance=0.0`,
      { headers }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch packages: ${response.statusText}`);
    }
    
    const data: PackageSearchResult = await response.json();
    
    // Process packages and get download counts
    const packages = await Promise.all(
      data.objects.map(async (obj) => {
        const pkg = obj.package;
        const downloads = await fetchPackageDownloads(pkg.name);
        
        return {
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          weeklyDownloads: downloads,
          score: obj.score.final,
        };
      })
    );
    
    const result = {
      packages,
      totalPages: Math.ceil(Math.min(data.total, 1000) / size),
    };
    
    setInCache(cacheKey, result);
    return result;
    */
  } catch (error) {
    console.error("Error fetching packages:", error);
    toast.error("Failed to fetch packages. Please try again later.");
    return { packages: [], totalPages: 0 };
  }
};

/**
 * Fetch weekly downloads for a package
 */
export const fetchPackageDownloads = async (packageName: string): Promise<number> => {
  const cacheKey = `downloads_${packageName}`;
  const cached = getFromCache<number>(cacheKey);
  
  if (cached !== null) {
    return cached;
  }
  
  try {
    // For this demo, we'll return a random number
    // In a real application, we would fetch from the NPM API
    const downloads = Math.floor(Math.random() * 10000000);
    setInCache(cacheKey, downloads);
    return downloads;
    
    // In a real application:
    /*
    const response = await fetch(`${NPM_DOWNLOADS_API}/${encodeURIComponent(packageName)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return 0;
      }
      throw new Error(`Failed to fetch downloads: ${response.statusText}`);
    }
    
    const data: PackageDownloads = await response.json();
    setInCache(cacheKey, data.downloads);
    return data.downloads;
    */
  } catch (error) {
    console.error(`Error fetching downloads for ${packageName}:`, error);
    return 0;
  }
};

/**
 * Fetch detailed package information
 */
export const fetchPackageDetails = async (packageName: string, version?: string): Promise<DetailedPackageInfo> => {
  const cacheKey = `package_${packageName}_${version || 'latest'}`;
  const cached = getFromCache<DetailedPackageInfo>(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    // For this demo, we'll return mock data
    // In a real application, we would fetch from the NPM API
    const mockIndex = parseInt(packageName.replace('package-', '')) || 1;
    const allVersions = Array.from({ length: 5 }, (_, i) => `1.${i}.0`);
    const mockDetail: DetailedPackageInfo = {
      name: packageName,
      version: version || `1.0.${mockIndex % 10}`,
      description: `This is a detailed description for ${packageName}`,
      weeklyDownloads: Math.floor(Math.random() * 10000000),
      score: Math.random(),
      allVersions,
      dependencies: {
        'react': '^18.0.0',
        'react-dom': '^18.0.0',
        'lodash': '^4.17.21',
      },
      devDependencies: {
        'typescript': '^4.9.5',
        'vite': '^4.1.0',
      },
      peerDependencies: {},
      fileCount: Math.floor(Math.random() * 100) + 20,
      unpackedSize: Math.floor(Math.random() * 1000000) + 50000,
      license: 'MIT',
      lastPublished: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      homepage: 'https://example.com',
      repository: 'https://github.com/example/repo',
      issues: 'https://github.com/example/repo/issues',
      keywords: ['react', 'component', 'ui'],
    };
    
    setInCache(cacheKey, mockDetail);
    return mockDetail;
    
    // In a real application:
    /*
    const packageUrl = version
      ? `${NPM_REGISTRY_API}/${encodeURIComponent(packageName)}/${version}`
      : `${NPM_REGISTRY_API}/${encodeURIComponent(packageName)}`;
    
    const response = await fetch(packageUrl, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch package details: ${response.statusText}`);
    }
    
    const data: PackageDetails = await response.json();
    const downloads = await fetchPackageDownloads(packageName);
    
    const pkgVersion = version || data.version;
    const versionData = version ? data : data.versions[pkgVersion];
    
    const allVersions = Object.keys(data.versions).sort((a, b) => {
      return new Date(data.time[b]).getTime() - new Date(data.time[a]).getTime();
    });
    
    const details: DetailedPackageInfo = {
      name: packageName,
      version: pkgVersion,
      description: versionData.description,
      weeklyDownloads: downloads,
      score: 0, // Would be fetched from search API
      allVersions,
      dependencies: versionData.dependencies || {},
      devDependencies: versionData.devDependencies || {},
      peerDependencies: versionData.peerDependencies || {},
      fileCount: data.dist?.fileCount || 0,
      unpackedSize: data.dist?.unpackedSize || 0,
      license: versionData.license || 'Unknown',
      lastPublished: data.time[pkgVersion],
      homepage: versionData.homepage || '',
      repository: versionData.repository?.url || '',
      issues: versionData.bugs?.url || '',
      keywords: versionData.keywords || [],
    };
    
    setInCache(cacheKey, details);
    return details;
    */
  } catch (error) {
    console.error(`Error fetching details for ${packageName}:`, error);
    toast.error(`Failed to fetch details for ${packageName}. Please try again later.`);
    
    // Return minimal package info
    return {
      name: packageName,
      version: version || 'unknown',
      description: 'Could not fetch package details',
      weeklyDownloads: 0,
      score: 0,
      allVersions: [],
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      fileCount: 0,
      unpackedSize: 0,
      license: 'Unknown',
      lastPublished: '',
      homepage: '',
      repository: '',
      issues: '',
      keywords: [],
    };
  }
};
