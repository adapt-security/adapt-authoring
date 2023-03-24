import path from 'path';
import { UiBuild } from "adapt-authoring-ui";

(new UiBuild({isDev:true, buildDir:path.resolve('APP_DATA/temp/ui-build')})).run();