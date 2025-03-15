
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPackageDetails, DetailedPackageInfo } from '@/services/api';
import { formatNumber, formatBytes, formatDate } from '@/lib/utils';
import { ExternalLink, Calendar, Download, Package, FileText, Code, Hash, Info, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface PackageDetailProps {
  slug?: string;
}

const PackageDetail: React.FC<PackageDetailProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [packageInfo, setPackageInfo] = useState<DetailedPackageInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackageDetails = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        // Parse the slug to get package name and version
        const dashIndex = slug.lastIndexOf('-');
        if (dashIndex === -1) return;

        const packageName = slug.substring(0, dashIndex);
        const version = slug.substring(dashIndex + 1);

        const details = await fetchPackageDetails(packageName, version);
        setPackageInfo(details);
      } finally {
        setLoading(false);
      }
    };

    loadPackageDetails();
  }, [slug]);

  const handleVersionChange = (newVersion: string) => {
    if (!packageInfo) return;
    navigate(`/package-detail/${packageInfo.name}-${newVersion}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-64 bg-muted rounded"></div>
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-48 w-full max-w-3xl bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!packageInfo) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold">Package not found</h1>
        <p className="text-muted-foreground mt-4">
          The package you're looking for could not be found or is not available.
        </p>
      </div>
    );
  }

  const {
    name,
    version,
    description,
    weeklyDownloads,
    allVersions,
    dependencies,
    devDependencies,
    peerDependencies,
    fileCount,
    unpackedSize,
    license,
    lastPublished,
    homepage,
    repository,
    issues,
    keywords,
  } = packageInfo;

  const dependenciesCount = Object.keys(dependencies || {}).length;
  const devDependenciesCount = Object.keys(devDependencies || {}).length;
  const peerDependenciesCount = Object.keys(peerDependencies || {}).length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {name}
              <Badge variant="outline" className="font-mono text-base ml-2">
                {version}
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">{description}</p>
          </div>

          <div className="flex items-center gap-3">
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Info className="mr-1 h-4 w-4" />
                Homepage
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
            {repository && (
              <a
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Code className="mr-1 h-4 w-4" />
                Repository
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="py-4 px-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Downloads</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-6">
              <div className="flex items-center">
                <Download className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-semibold">{formatNumber(weeklyDownloads)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="py-4 px-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">Size</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-6">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-semibold">{formatBytes(unpackedSize)}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {fileCount} files
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="py-4 px-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">License</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-6">
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-semibold">{license || 'Unknown'}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="py-4 px-6">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Published</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-semibold">{formatDate(lastPublished)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Package Versions</h2>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-3">Current:</span>
              <Select value={version} onValueChange={handleVersionChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {allVersions.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {keywords && keywords.length > 0 && keywords.map((keyword, i) => (
              <Badge key={i} variant="secondary" className="transition-transform hover:scale-105">
                <Tag className="h-3 w-3 mr-1" />
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="dependencies" className="mb-12">
        <TabsList>
          <TabsTrigger value="dependencies">Dependencies ({dependenciesCount})</TabsTrigger>
          <TabsTrigger value="devDependencies">Dev Dependencies ({devDependenciesCount})</TabsTrigger>
          <TabsTrigger value="peerDependencies">Peer Dependencies ({peerDependenciesCount})</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="dependencies">
            <Card>
              <CardContent className="p-6">
                {dependenciesCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(dependencies).map(([dep, ver]) => (
                      <div key={dep} className="flex items-center justify-between p-3 border border-border rounded-md">
                        <div className="font-medium">{dep}</div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {ver}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-6">
                    No dependencies found
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devDependencies">
            <Card>
              <CardContent className="p-6">
                {devDependenciesCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(devDependencies).map(([dep, ver]) => (
                      <div key={dep} className="flex items-center justify-between p-3 border border-border rounded-md">
                        <div className="font-medium">{dep}</div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {ver}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-6">
                    No dev dependencies found
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peerDependencies">
            <Card>
              <CardContent className="p-6">
                {peerDependenciesCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(peerDependencies).map(([dep, ver]) => (
                      <div key={dep} className="flex items-center justify-between p-3 border border-border rounded-md">
                        <div className="font-medium">{dep}</div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {ver}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-6">
                    No peer dependencies found
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PackageDetail;
