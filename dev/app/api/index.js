import * as resource from './resource'

export const getMusicList = (type, options) => {
  return resource.getMusicList.get({
    type: type
  });
}