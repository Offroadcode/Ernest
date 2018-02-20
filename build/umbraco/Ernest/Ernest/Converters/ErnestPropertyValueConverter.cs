using System;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;
using Newtonsoft.Json.Linq;
using System.Web.Mvc;

namespace Ernest.Converters
{
    [PropertyValueType(typeof(IHtmlString))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
    public class ErnestPropertyValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("Ernest.Editor");
        }

        public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return null;
            var sourceString = source.ToString();

            if (DetectIsJson(sourceString))
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<JObject>(sourceString);

                    var html = obj.Value<string>("html");

                    if (!string.IsNullOrEmpty(html))
                    {
                        return MvcHtmlString.Create(html);
                    }

                }
                catch (Exception ex)
                {
                    return null;
                }
            }

            return sourceString;
        }

        private bool DetectIsJson(string input)
        {
            input = input.Trim();
            return input.StartsWith("{") && input.EndsWith("}")
                   || input.StartsWith("[") && input.EndsWith("]");
        }

    }
}